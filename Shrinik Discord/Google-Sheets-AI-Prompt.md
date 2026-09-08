# Prompt for Google Sheets AI (Gemini in Sheets or similar)

Copy everything below the line and paste it into the AI/agent that can create and edit your Google Sheet. It's written as a direct instruction set, in order, so the AI can build it top to bottom without needing to ask you anything.

---

Create a new Google Sheets spreadsheet named **"Shrink Club PR & Social CRM"**. Build the following tabs, in this exact order, with these exact column headers, dropdown lists, and formulas. Do not rename, skip, or reorder anything unless a step says "optional."

## General formatting rules (apply to every tab)

- Freeze row 1 on every tab.
- Make row 1 bold, with a light gray background (#F3F3F3) and black text.
- Auto-resize all columns to fit their header text.
- Any column marked "Date" below should be formatted as Date (Format → Number → Date).
- Color-code the tabs: PR-related tabs blue, Social-related tabs pink/magenta, the Dashboard tab green, everything else default.

## Tab 1: "Brands & Sponsors"

Add these column headers in row 1, columns A through X, in this exact order:

| Col | Header | Type / Data Validation |
|---|---|---|
| A | Brand/Company Name | Plain text |
| B | Category | Dropdown: Apparel, Beverage, EdTech, Food & Beverage, Finance, Gaming, Health & Wellness, Retail, Tech, Other *(edit this list to match your club's actual sponsor categories)* |
| C | Website | Plain text (URL) |
| D | Contact Person | Plain text |
| E | Designation | Plain text |
| F | Email | Plain text (email) |
| G | Phone | Plain text |
| H | LinkedIn | Plain text (URL) |
| I | Instagram | Plain text (URL) |
| J | Location | Plain text |
| K | Source of Contact | Dropdown: Cold Email, LinkedIn, Instagram DM, Referral, Event, Website Form, Phone, Other |
| L | Sponsorship Type | Dropdown: Cash Sponsorship, In-Kind/Product, Media Partnership, Prize Sponsorship, Venue Sponsorship, Other |
| M | Potential Opportunity | Plain text, long-form (wrap text on) |
| N | Assigned PR Member | Dropdown: [PLACEHOLDER — list your actual PR team members' names here; I'll provide the list separately or edit this later] |
| O | Section | Dropdown: Sponsorship Research, Outreach, Event Relations. Optional/informational only — does not control access. |
| P | Status | Dropdown: Not Contacted, Contacted, Response Received, Interested, Meeting Scheduled, Negotiation, Confirmed, Rejected, Follow-up Required |
| Q | First Contact Date | Date |
| R | Last Contact Date | Date |
| S | Next Follow-up Date | Date |
| T | Communication Notes | Plain text, long-form (wrap text on) |
| U | Last Action | Plain text |
| V | Next Action | Plain text |
| W | Last Modified By | Leave completely blank. Do not add data validation or sample values — this will be auto-filled later by a script. |
| X | Last Modified Time | Leave completely blank, same reason as above. |

After the headers, add 3 sample rows of realistic placeholder data (clearly using names like "SAMPLE — Brand A") so the tab isn't empty, covering a mix of different Status values (one "Not Contacted", one "Contacted", one "Confirmed"). Leave columns W and X blank on these rows too.

## Tab 2: "Social Media Tasks"

Add these column headers in row 1, columns A through K, in this exact order:

| Col | Header | Type / Data Validation |
|---|---|---|
| A | Content/Task Name | Plain text |
| B | Content Type | Dropdown: Reel, Post, Story, Carousel, Video, Poster, Other |
| C | Assigned Member | Dropdown: [PLACEHOLDER — list your actual Social team members' names here] |
| D | Platform | Dropdown: Instagram, LinkedIn, YouTube, Other |
| E | Section | Dropdown: Content, Design. Optional/informational only — does not control access. |
| F | Status | Dropdown: Idea, Planned, In Progress, Ready, Posted |
| G | Scheduled Date | Date |
| H | Post Link | Plain text (URL) |
| I | Remarks | Plain text, long-form (wrap text on) |
| J | Last Modified By | Leave completely blank — auto-filled later by a script. |
| K | Last Modified Time | Leave completely blank, same reason. |

Add 3 sample rows here too, covering a mix of Status values ("Idea", "In Progress", "Posted"), clearly labeled as SAMPLE data. Leave columns J and K blank.

## Tabs 3–6: PR pipeline stage views

Create 4 new tabs. In cell **A1** of each, enter exactly this formula (nothing else on the tab — the formula spills to fill the rest automatically):

**Tab name: "PR – New Leads"**
```
=QUERY('Brands & Sponsors'!A1:X, "select * where P = 'Not Contacted'", 1)
```

**Tab name: "PR – In Progress"**
```
=QUERY('Brands & Sponsors'!A1:X, "select * where P = 'Contacted' or P = 'Response Received' or P = 'Interested' or P = 'Meeting Scheduled' or P = 'Negotiation' or P = 'Follow-up Required'", 1)
```

**Tab name: "PR – Confirmed"**
```
=QUERY('Brands & Sponsors'!A1:X, "select * where P = 'Confirmed'", 1)
```

**Tab name: "PR – Closed-Rejected"**
```
=QUERY('Brands & Sponsors'!A1:X, "select * where P = 'Rejected'", 1)
```

## Tabs 7–10: Social pipeline stage views

Create 4 more tabs, same pattern, pulling from the Social Media Tasks tab:

**Tab name: "Social – Ideas & Planning"**
```
=QUERY('Social Media Tasks'!A1:K, "select * where F = 'Idea' or F = 'Planned'", 1)
```

**Tab name: "Social – In Progress"**
```
=QUERY('Social Media Tasks'!A1:K, "select * where F = 'In Progress'", 1)
```

**Tab name: "Social – Ready to Post"**
```
=QUERY('Social Media Tasks'!A1:K, "select * where F = 'Ready'", 1)
```

**Tab name: "Social – Posted"**
```
=QUERY('Social Media Tasks'!A1:K, "select * where F = 'Posted'", 1)
```

## Tabs 11–12: Follow-up trackers

**Tab name: "Today's Follow-ups"** — cell A1:
```
=QUERY('Brands & Sponsors'!A1:X, "select * where S = date '"&TEXT(TODAY(),"yyyy-MM-dd")&"'")
```

**Tab name: "Overdue Follow-ups"** — cell A1:
```
=QUERY('Brands & Sponsors'!A1:X, "select * where S < date '"&TEXT(TODAY(),"yyyy-MM-dd")&"' and P <> 'Confirmed' and P <> 'Rejected'")
```

## Tab 13: "Dashboard"

Create a tab named "Dashboard." Lay it out as two side-by-side sections with bold section headers, and add these labeled formulas (label in the left column, formula in the column next to it):

**Section header: "PR Pipeline"**
```
Total Brands       =COUNTA('Brands & Sponsors'!A2:A)
New Leads          =COUNTIF('Brands & Sponsors'!P2:P,"Not Contacted")
In Progress        =COUNTIF('Brands & Sponsors'!P2:P,"Contacted")+COUNTIF('Brands & Sponsors'!P2:P,"Response Received")+COUNTIF('Brands & Sponsors'!P2:P,"Interested")+COUNTIF('Brands & Sponsors'!P2:P,"Meeting Scheduled")+COUNTIF('Brands & Sponsors'!P2:P,"Negotiation")+COUNTIF('Brands & Sponsors'!P2:P,"Follow-up Required")
Confirmed          =COUNTIF('Brands & Sponsors'!P2:P,"Confirmed")
Closed/Rejected    =COUNTIF('Brands & Sponsors'!P2:P,"Rejected")
Follow-ups Today    =COUNTA('Today''s Follow-ups'!A2:A)
```

**Section header: "Social Pipeline"**
```
Total Tasks         =COUNTA('Social Media Tasks'!A2:A)
Ideas & Planning     =COUNTIF('Social Media Tasks'!F2:F,"Idea")+COUNTIF('Social Media Tasks'!F2:F,"Planned")
In Progress          =COUNTIF('Social Media Tasks'!F2:F,"In Progress")
Ready to Post        =COUNTIF('Social Media Tasks'!F2:F,"Ready")
Posted               =COUNTIF('Social Media Tasks'!F2:F,"Posted")
```

After adding these, create one pie chart from the PR Pipeline stage counts (New Leads / In Progress / Confirmed / Closed-Rejected) and one pie chart from the Social Pipeline stage counts, both placed on the Dashboard tab.

## Things to explicitly NOT do

- Do not put anything in columns W/X (Tab 1) or J/K (Tab 2) beyond leaving them blank — a separate Apps Script will fill these automatically later, and pre-filled values will break that.
- Do not merge cells anywhere — it breaks the QUERY formulas.
- Do not add extra columns to Tab 1 or Tab 2 without also updating the QUERY formulas in every view tab that references them by column letter.
- Do not convert the QUERY view tabs into static data (no "paste as values") — they need to stay live formulas.

## When done, confirm back to me:

- All 13 tabs exist with the exact names above.
- Every dropdown validation is correctly attached to its column.
- All QUERY formulas are returning rows (not errors) once the sample data is in place.
- The Dashboard's numbers match a manual count of the sample rows.

---

*Note: the two `[PLACEHOLDER]` dropdown lists (Assigned PR Member, Assigned Member) need your actual teammates' names — either edit the prompt above before sending it, or tell the AI your team's names as a follow-up once the sheet exists.*
