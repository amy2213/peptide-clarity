export default function Page() {
  return (
    <main className="shell">
      <div className="eyebrow">Peptide Clarity · Engineering prototype</div>
      <h1>Owner-only data preview</h1>
      <p className="lead">
        This separate application tests an evidence-aware server API against an isolated
        PostgreSQL database. No research data is exposed without staging authorization.
      </p>
      <div className="grid">
        <section className="panel">
          <h2>Search and source links</h2>
          <p>Draft substance and scientific evidence records are available only through protected, read-only endpoints.</p>
        </section>
        <section className="panel">
          <h2>Company and lot evidence</h2>
          <p>Seller assertions, document presence, and independent verification status remain distinct.</p>
        </section>
        <section className="panel">
          <h2>Publication firewall</h2>
          <p>Raw research cannot be published by a source-ingestion worker or an anonymous visitor.</p>
        </section>
      </div>
      <p className="note">This is not a pharmacy directory, product endorsement, medical service, or public launch.
        Never rely on a research seller&apos;s purity claim as proof of suitability for human use.</p>
    </main>
  );
}
