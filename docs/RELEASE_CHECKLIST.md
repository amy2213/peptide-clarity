# REL-GATE-001 | Release / Prototype Promotion Checklist

Copy into each release PR and retain a dated, linked result. **Blank is not passed.** Prototype promotion is not G7 authorization.

## Record

- Version / target environment:
- Source branch + commit SHA:
- Scope, linked Issue/PR/requirements:
- Owner and date:
- Release class: internal preview / public owner-testing prototype / final public product
- Affected governance gates and exceptions:

## Gate checklist

- [ ] Product scope and acceptance criteria approved under GOV-001 F-001; any exceptions documented
- [ ] Change impact on G1-G7 and PDP assessed; relevant approvals identified
- [ ] Critical medical, regulatory, supplier and pharmacy-specific claims verified against dated, direct evidence
- [ ] Qualified scientific/editorial and analytical review completed where needed, or release restricted appropriately
- [ ] No false FDA-approved, compounded-drug, laboratory-authentication or human-use safety assertions
- [ ] Data/claim/COA/lot provenance and corrections audit completed; unresolved records labeled
- [ ] Accessibility: manual keyboard, focus, zoom and mobile checks; screen-reader/VoiceOver results documented
- [ ] Security and privacy: static/secret inspection, links, dependencies, data collection and actual hosting limitations
- [ ] Automated checks passing with exact run link; manual test evidence attached; defects triaged
- [ ] Rollback version SHA, post-deploy smoke tests, monitoring/correction owner and communications ready
- [ ] Owner explicitly approves **this specific scope and release class**
- [ ] **G7** final public product approval independently recorded, if applicable; otherwise clearly say **not approved**
- [ ] Deployed URL and live-served version actually verified (if deployed)

## Outcome

**Decision:** approved / blocked / limited owner-preview only / rolled back  
**Evidence links:**  
**Open risks:**  
**Owner authorization quote or record:**  
**Verified by/date:**  
**Rollback:**  

No unconditional deployment merely because CI is green.
