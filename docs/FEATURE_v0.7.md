# Peptide Clarity v0.7 | Eight source-linked plain-English profiles

**Status:** Internal/owner-review draft, not public release approval.  
**Research snapshot:** October 25, 2026.  
**Working standard:** GOV-001; owner-led evaluation exceptions DEC-001/DEC-002.  
**GitHub deployment:** Proposed separate draft PR. Public `main` remains unchanged pending release decision.

## Core intent
Someone should be able to choose a peptide and quickly answer, in ordinary language: *What is it? Why are people interested? What have researchers found in actual people? What is still uncertain?* The user should never need to decipher a regulatory status label or laboratory method just to understand the opening explanation.

## New source-linked summaries
Eight catalog items now have independently inspectable links supporting three bounded findings apiece, plus four short explanatory paragraphs:

| Entry | Evidence distinction that visitors need to understand |
|---|---|
| Semax | Older human stroke research exists; that does not establish general benefits for cognition or stroke recovery |
| Selank | A comparative study included 60 people; small human research is not broad evidence of safety and benefit |
| GHK-Cu | Lab/animal skin evidence and limited mixed human cosmetics research differ sharply from injectable safety evidence |
| TB-500 | Acetylated fragment and full-length thymosin beta-4 are different chemicals; animal wound studies aren't human treatment proof |
| 5-Amino-1MQ | An NNMT inhibitor and **not a peptide**; weight findings are in mice, not established human outcomes |
| CJC-1295 | Small healthy-adult studies measured changes in hormones; biomarker changes are not proved health/performance benefits |
| Retatrutide | Large published Phase 3 trials in 2026 reported outcomes in specific patient populations; still investigational and not FDA-approved in this snapshot |
| Tesamorelin | EGRIFTA SV/WR are prescription products for specific HIV-related excess abdominal fat, **not general weight loss**; approved labels have important warnings |

## Information architecture
- Main explainer card has four short sections: **What is it?**, **Why are people interested?**, **What have researchers actually found?**, **What's still unknown or concerning?**
- Secondary "How to read the research" explanation always separates human, animal, analytical, and product-specific regulatory evidence.
- Three specific research findings with inline, expandable **"What does this actually mean?"** and the original source after each. Text does not substitute a supplier certificate for a clinical trial.
- Technical references remain optional for users who want details.
- Catalog maintains all 84 names, including pending profiles, aliases, and browse-all functionality.
- Existing five vendor dossiers and 15 company/compound/lot associations preserved; no new supplier authentication claimed.

## Corrections made before saving this version
- Replaced a mismatched proposed FDA Purple Book record with actual EGRIFTA WR and EGRIFTA SV prescription labels on DailyMed.
- Replaced an ambiguous trial-registry reference with the October 2026 published retatrutide TRIUMPH-2 human trial.
- The earlier NNMT study is properly described as related **enzyme-target mouse work**, not as a direct human trial of 5-Amino-1MQ.
- None of these additions endorses investigational product procurement, human use, dose, or supplier quality.

## Dataset and version history
- 84 searchable names; **13** records now have initial source-linked claim lists; **eight** new/expanded entries; **24** new bounded draft claim records; **41** total source records.
- Company and lot data unchanged: five named vendor dossiers, 15 compound-lot associations, issuerAuthenticated=false and sampleCustodyVerified=false for all lot records.
- `data.json` and embedded JSON are identical; records are not expert-signed, and source abstracts are not substitutes for full systematic clinical review.

## Out of scope for this iteration
No new vendor review, lab confirmation, purchasing links, medical recommendations, injection guidance, third-party user interviews, personal uploads, accounts, or final regulatory/legal/scientific sign-off. These continue to require separate authorized work. The GitHub repository is publicly readable; development drafts are not confidential.