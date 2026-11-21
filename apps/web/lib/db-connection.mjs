// OPS-003: server-only database connection policy.
// Refuse any unexpected project, superuser, service key, or insecure hosted connection.
const STAGING_REF = "jyzyguuukscavzqirlmv";
const STAGING_HOST = "db." + STAGING_REF + ".supabase.co";
const STAGING_READER = "pc_stage_web";

/**
 * @param {NodeJS.ProcessEnv} env
 * @returns {{host:string,port:number,database:string,user:string,password:string,ssl:false|{rejectUnauthorized:true,ca?:string}}}
 */
export function getPreviewDbConfig(env) {
  const connection = env.DATABASE_URL;
  if (!connection) throw new Error("Restricted staging DATABASE_URL not configured");
  let uri;
  try {
    uri = new URL(connection);
  } catch {
    throw new Error("Invalid DATABASE_URL");
  }
  if (!["postgres:", "postgresql:"].includes(uri.protocol) || !uri.hostname || !uri.username) {
    throw new Error("Invalid PostgreSQL connection URI");
  }
  const mode = env.PC_DATABASE_MODE;
  const port = Number(uri.port || 5432);
  const user = decodeURIComponent(uri.username);
  const database = uri.pathname.slice(1);
  const password = decodeURIComponent(uri.password);
  if (!password || !Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error("Incomplete PostgreSQL connection");
  }
  if (uri.search) throw new Error("Connection URL must not include unsafe/ambiguous options");
  if (mode === "ci") {
    // CI credential is only accepted for a localhost database with a dedicated fixture.
    if (env.PC_ALLOW_DISPOSABLE_LOCAL_TEST !== "true" ||
        !["localhost", "127.0.0.1"].includes(uri.hostname) ||
        port !== 5432 || database !== "poc_test" || user !== "pc_ci_web") {
      throw new Error("CI database connection failed strict local-only checks");
    }
    return { host:uri.hostname,port,database,user,password,ssl:false };
  }
  if (mode !== "hosted") throw new Error("PC_DATABASE_MODE must be hosted or ci");

  const direct = uri.hostname === STAGING_HOST;
  const pooled = /^[a-z0-9-]+\.pooler\.supabase\.com$/.test(uri.hostname);
  if ((!direct && !pooled) ||
      (direct && (user !== STAGING_READER || port !== 5432)) ||
      (pooled && (user !== STAGING_READER + "." + STAGING_REF || ![5432,6543].includes(port))) ||
      database !== "postgres") {
    throw new Error("Staging project or read-only login mismatch");
  }
  // Use Node's TLS peer and hostname verification. Never accept rejectUnauthorized:false.
  const ca = env.PC_DB_CA_PEM;
  return {
    host:uri.hostname,port,database,user,password,
    ssl:ca?{rejectUnauthorized:true,ca}:{rejectUnauthorized:true},
  };
}
