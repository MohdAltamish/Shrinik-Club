# PR & Social Media Discord CRM — Setup Guide (Google Sheets Edition)

*(Written for Shrink Club's PR & Social Media teams — swap the name if this is for a different club.)*

## Read This First — 2 Minutes

Quick heads-up before you build anything: **Discord is a chat app, not a database.** It can't store structured records, run filters, or count totals by itself.

So this guide connects two free tools:

- **Discord** — where your team talks, gets notified, and is split into sections.
- **Google Sheets** — where the real data lives: brand records, statuses, dates, and a dashboard.

They talk to each other using **Discord Webhooks** (a link that lets an app post a message into a channel automatically) and a small bit of **Google Apps Script** (Google's built-in scripting tool that lives inside every Sheet — no separate app to install).

> **In plain English:** Airtable does the "connect to Discord automatically" part with a few clicks. Google Sheets doesn't have that button built in, so we write a small, copy-pasteable script instead. You won't need to understand how to code — just where to paste things and what to click.

If you'd rather use zero outside tools at all, jump to **Part F: Discord-Only Lite Mode**.

---

## Part A — Roles

Server Settings → Roles → Create Role. Create these 4, in this order (top = most access):

| Role | Who | Access |
|---|---|---|
| `@Core Team` | Club leads/admins | Everything — all channels, all data |
| `@PR Team` | Everyone doing PR work (research, outreach, event relations — no split) | All PR channels |
| `@Social Team` | Everyone doing social work (content, design — no split) | All Social channels |
| `@Member` | Everyone, auto-assigned on join | Public channels only |

> **In plain English:** Instead of one role per sub-team, everyone doing PR work gets the same `@PR Team` role and everyone doing social work gets `@Social Team`. Sub-team distinctions still exist as *work stages* (Part B) — people just aren't split into separate roles for it anymore. Much less to manage as members join, leave, or move between tasks.

Assign roles manually — right-click a member → Roles. At club scale you don't need a self-serve bot for this; Core Team just adds new members to the right team when they join.

---

## Part B — Categories & Channels

Instead of splitting channels by sub-team, each team now has one category with a channel **per pipeline stage** — everyone on that team sees every stage, but the channel tells you *where a brand or task currently sits*, grouped into 4 broad buckets so it doesn't turn into 8-9 near-empty channels.

Build in this order. For every private category: right-click it → Edit Category → Permissions → deny `@everyone` "View Channel" → allow the relevant team role + `@Core Team`.

**📌 START HERE** *(public)*
- `#welcome`
- `#announcements`
- `#how-this-server-works` — pin a short version of this guide

**🔍📞🤝 PR TEAM** *(private → `@PR Team`, `@Core Team`)*
- `#pr-team-chat` — general PR discussion, questions, coordination
- `#pr-new-leads` — pin the "New Leads" sheet view *(Status: Not Contacted)*
- `#pr-in-progress` — pin the "In Progress" sheet view *(Status: Contacted → Negotiation, Follow-up Required)*
- `#pr-confirmed` — pin the "Confirmed" sheet view *(Status: Confirmed)*
- `#pr-closed-rejected` — pin the "Closed/Rejected" sheet view *(Status: Rejected)*
- `#follow-up-alerts` — bot-only, auto-posts Today's/Overdue follow-ups (cuts across all stages, so it stays separate)

**🎨🖌️ SOCIAL TEAM** *(private → `@Social Team`, `@Core Team`)*
- `#social-team-chat` — general social discussion, drafts, feedback
- `#social-ideas-planning` — pin the "Ideas & Planning" sheet view *(Status: Idea, Planned)*
- `#social-in-progress` — pin the "In Progress" sheet view *(Status: In Progress)*
- `#social-ready-to-post` — pin the "Ready to Post" sheet view *(Status: Ready)*
- `#social-posted` — pin the "Posted" sheet view *(Status: Posted)*

**📊 CORE TEAM ONLY** *(private → `@Core Team`)*
- `#master-dashboard` — pin the Dashboard tab link
- `#activity-log` — bot-only, auto-posts every record change
- `#weekly-reports`
- `#core-team-chat`

**💬 COMMUNITY** *(public)*
- `#general`
- `#random`

~18 channels, 5 categories, only 4 roles to manage. A brand or task doesn't move channels as its status changes — the pinned view in each channel updates itself live, since it's just a filtered look at the same sheet (see Part C).

---

## Part C — The Database: Google Sheets

Free account at sheets.google.com (any Gmail account works). **One spreadsheet file, several tabs.** This is your single source of truth — Discord never stores data, only links to it and gets notified about it.

### Step 1: Create the file and the two main tabs

Create one new Google Sheet, name it something like **"Shrink Club PR & Social CRM"**. Rename the first two tabs (right-click the tab → Rename):

#### Tab 1 — "Brands & Sponsors" *(covers requirements #1, #2, #4)*

Put these as your column headers in row 1, in this order:

| Col | Field | Notes |
|---|---|---|
| A | Brand/Company Name | |
| B | Category | Use Data → Data Validation → Dropdown for a fixed list |
| C | Website | |
| D | Contact Person | |
| E | Designation | |
| F | Email | |
| G | Phone | |
| H | LinkedIn | |
| I | Instagram | |
| J | Location | |
| K | Source of Contact | Dropdown |
| L | Sponsorship Type | Dropdown |
| M | Potential Opportunity | |
| N | Assigned PR Member | Dropdown, list your teammates' names |
| O | Section *(optional)* | Dropdown: Sponsorship Research / Outreach / Event Relations — no longer drives Discord access, just handy if you still want to tag who's doing what internally. Delete this column if you don't need it. |
| P | **Status** | Dropdown: Not Contacted / Contacted / Response Received / Interested / Meeting Scheduled / Negotiation / Confirmed / Rejected / Follow-up Required — *this is what drives which channel view a row shows up in* |
| Q | First Contact Date | Format cells as Date |
| R | Last Contact Date | Format cells as Date |
| S | Next Follow-up Date | Format cells as Date |
| T | Communication Notes | |
| U | Last Action | |
| V | Next Action | |
| W | Last Modified By | Auto-filled by the script in Part D — leave blank |
| X | Last Modified Time | Auto-filled by the script in Part D — leave blank |

> **In plain English:** "Dropdown" means Data → Data Validation → choose "Dropdown" and type your list of options. This stops people from typing "confirmd" instead of "Confirmed" and messing up your filters later.

> **Why Last Modified By/Time aren't automatic here:** Airtable fills these in by itself. Plain Google Sheets doesn't — that's exactly what the script in Part D does for you, so don't type into columns W and X manually.

#### Tab 2 — "Social Media Tasks" *(covers requirement #5)*

| Col | Field | Notes |
|---|---|---|
| A | Content/Task Name | |
| B | Content Type | Dropdown |
| C | Assigned Member | Dropdown |
| D | Platform | Dropdown: Instagram / LinkedIn / YouTube / Other |
| E | Section *(optional)* | Dropdown: Content / Design — no longer drives access, just internal tagging if you want it |
| F | **Status** | Dropdown: Idea / Planned / In Progress / Ready / Posted — *this is what drives which channel view a row shows up in* |
| G | Scheduled Date | Format as Date |
| H | Post Link | |
| I | Remarks | |
| J | Last Modified By | Auto-filled by script |
| K | Last Modified Time | Auto-filled by script |

### Step 2: Build the "views" — one per pipeline stage (requirement #7)

Google Sheets doesn't have Airtable's one-click "share this filtered view as its own private link" feature. So we build the same result a slightly different way, using a formula called `QUERY` — think of it as "ask this tab a question, and it hands back only the matching rows." Each view now filters by **Status**, grouped into the same 4 stage buckets as your Discord channels.

**Simple method (recommended for a college club):**

1. Create a new tab called **"PR – New Leads"**.
2. In cell A1, paste:
   ```
   =QUERY('Brands & Sponsors'!A1:X, "select * where P = 'Not Contacted'", 1)
   ```
   This says: *"Look at the Brands & Sponsors tab, and only show me rows where the Status column (P) says Not Contacted."* It updates live — as soon as someone edits the master tab, this view updates too.
3. Repeat for each PR stage bucket, changing the text inside the quotes:
   - **"PR – In Progress"** → `where P = 'Contacted' or P = 'Response Received' or P = 'Interested' or P = 'Meeting Scheduled' or P = 'Negotiation' or P = 'Follow-up Required'`
   - **"PR – Confirmed"** → `where P = 'Confirmed'`
   - **"PR – Closed/Rejected"** → `where P = 'Rejected'`
4. Then the same idea for Social, pulling from the Social Media Tasks tab instead:
   - **"Social – Ideas & Planning"** → `=QUERY('Social Media Tasks'!A1:K, "select * where F = 'Idea' or F = 'Planned'", 1)`
   - **"Social – In Progress"** → `where F = 'In Progress'`
   - **"Social – Ready to Post"** → `where F = 'Ready'`
   - **"Social – Posted"** → `where F = 'Posted'`
5. **"Today's Follow-ups"** tab (unchanged — cuts across every stage, that's the point):
   ```
   =QUERY('Brands & Sponsors'!A1:X, "select * where S = date '"&TEXT(TODAY(),"yyyy-MM-dd")&"'")
   ```
6. **"Overdue Follow-ups"** tab:
   ```
   =QUERY('Brands & Sponsors'!A1:X, "select * where S < date '"&TEXT(TODAY(),"yyyy-MM-dd")&"' and P <> 'Confirmed' and P <> 'Rejected'")
   ```

Then: **File → Share** the whole spreadsheet with your team (Editor access), and pin the link to the matching tab in each channel (`#pr-new-leads` gets the "PR – New Leads" tab link, and so on). You can jump straight to a tab by right-clicking it → "Copy link to sheet" — that link opens the file already scrolled to that tab.

⚠️ **Be honest about this limit:** anyone with Editor access to the file can still click over to other tabs and see everything — including the *other team's* tab — since Google Sheets can only lock *editing* per tab, not *viewing*. With only two teams now, the practical risk is smaller than before (PR could technically open Social's tab and vice versa), and for a trusted college club this is normally fine — the Discord channel permissions already control who *knows the link exists*.

**Stricter method (only if you genuinely need to hide one team's data from the other):**

Instead of one shared file, keep the PR data and Social data in **two separate Google Sheets**, and pull each team's rows into their own file using `IMPORTRANGE`:
```
=QUERY(IMPORTRANGE("your-master-sheet-url", "Brands & Sponsors!A1:X"), "select * where Col16 = 'Not Contacted'")
```
(First time you use `IMPORTRANGE`, Sheets will ask you to click "Allow access" once.) Then share the PR file only with `@PR Team` + `@Core Team`, and the Social file only with `@Social Team` + `@Core Team`. This genuinely stops one team from seeing the other's data — but it's two files to maintain instead of one. Only worth it if that separation actually matters to you.

### Step 3: Build the Dashboard tab *(requirement #6)*

Create a tab called **"Dashboard"**. Use simple counting formulas — no special feature needed:

```
--- PR pipeline (matches the 4 PR channels) ---
Total Brands:      =COUNTA('Brands & Sponsors'!A2:A)
New Leads:         =COUNTIF('Brands & Sponsors'!P2:P,"Not Contacted")
In Progress:       =COUNTIF('Brands & Sponsors'!P2:P,"Contacted")+COUNTIF('Brands & Sponsors'!P2:P,"Response Received")+COUNTIF('Brands & Sponsors'!P2:P,"Interested")+COUNTIF('Brands & Sponsors'!P2:P,"Meeting Scheduled")+COUNTIF('Brands & Sponsors'!P2:P,"Negotiation")+COUNTIF('Brands & Sponsors'!P2:P,"Follow-up Required")
Confirmed:         =COUNTIF('Brands & Sponsors'!P2:P,"Confirmed")
Closed/Rejected:   =COUNTIF('Brands & Sponsors'!P2:P,"Rejected")
Follow-ups Today:  =COUNTA('Today''s Follow-ups'!A2:A)

--- Social pipeline (matches the 4 Social channels) ---
Total Tasks:            =COUNTA('Social Media Tasks'!A2:A)
Ideas & Planning:       =COUNTIF('Social Media Tasks'!F2:F,"Idea")+COUNTIF('Social Media Tasks'!F2:F,"Planned")
In Progress:            =COUNTIF('Social Media Tasks'!F2:F,"In Progress")
Ready to Post:          =COUNTIF('Social Media Tasks'!F2:F,"Ready")
Posted:                 =COUNTIF('Social Media Tasks'!F2:F,"Posted")
```

Then select the Status column data → **Insert → Chart** → pick "Pie chart" for a quick visual status breakdown. Pin the Dashboard tab link in `#master-dashboard`.

---

## Part D — Connecting Google Sheets → Discord (with Apps Script)

This is the one part that needs a little copy-pasted code instead of a button click. Don't worry — you paste it once, click a couple of menus to turn it on, and never touch it again.

> **Quick definitions, in plain English:**
> - **Webhook** = a special link. If you send a message to that link, it shows up as a post in a specific Discord channel — like a mailbox address just for that channel.
> - **Apps Script** = a little code editor built into every Google Sheet (Extensions → Apps Script). It can watch for edits and react to them.
> - **Trigger** = a rule that says "run this bit of code automatically when X happens" — like "whenever a cell is edited" or "every day at 9am."

### Step 1 — Get your webhook URLs

For these 5 channels: `#follow-up-alerts`, `#activity-log`, `#core-team-chat`, `#pr-new-leads`, `#social-posted`:
Channel Settings → Integrations → Webhooks → New Webhook → **Copy Webhook URL**.

Keep these URLs somewhere handy — you'll paste them into the script below.

### Step 2 — Open the script editor

In your Google Sheet: **Extensions → Apps Script**. This opens a new tab with a blank code editor. Delete anything already there, and paste in the code below.

### Step 3 — Paste this code

```javascript
// ====== PASTE YOUR DISCORD WEBHOOK URLS HERE ======
const FOLLOWUP_WEBHOOK   = "PASTE_YOUR_FOLLOWUP_ALERTS_WEBHOOK_URL";
const ACTIVITY_WEBHOOK   = "PASTE_YOUR_ACTIVITY_LOG_WEBHOOK_URL";
const CONFIRMED_WEBHOOK  = "PASTE_YOUR_CORE_TEAM_CHAT_WEBHOOK_URL";
const NEWLEAD_WEBHOOK    = "PASTE_YOUR_PR_NEW_LEADS_WEBHOOK_URL";   // posts to #pr-new-leads
const POSTED_WEBHOOK     = "PASTE_YOUR_SOCIAL_POSTED_WEBHOOK_URL";  // posts to #social-posted

// Brands & Sponsors tab — columns (matches Part C, Tab 1)
const PR_SHEET = "Brands & Sponsors";
const PR_COL = {
  NAME: 1, STATUS: 16, NEXT_FOLLOWUP: 19,
  ASSIGNED: 14, LAST_MOD_BY: 23, LAST_MOD_TIME: 24
};

// Social Media Tasks tab — columns (matches Part C, Tab 2)
const SOCIAL_SHEET = "Social Media Tasks";
const SOCIAL_COL = {
  NAME: 1, STATUS: 6, LAST_MOD_BY: 10, LAST_MOD_TIME: 11
};

// Sends one message into a Discord channel via its webhook
function sendToDiscord(webhookUrl, message) {
  if (!webhookUrl || webhookUrl.indexOf("PASTE_YOUR") === 0) return;
  UrlFetchApp.fetch(webhookUrl, {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify({ content: message })
  });
}

// Runs automatically every time someone edits EITHER tab — routes to the right handler
function onEditInstallable(e) {
  const sheetName = e.range.getSheet().getName();
  if (sheetName === PR_SHEET) handlePrEdit(e);
  if (sheetName === SOCIAL_SHEET) handleSocialEdit(e);
}

// Handles edits on the Brands & Sponsors tab
function handlePrEdit(e) {
  const sheet = e.range.getSheet();
  const row = e.range.getRow();
  if (row === 1) return; // ignore the header row

  const editorEmail = Session.getActiveUser().getEmail() || "Someone";
  const name = sheet.getRange(row, PR_COL.NAME).getValue();

  // Stamp who edited it and when (replaces Airtable's built-in field)
  sheet.getRange(row, PR_COL.LAST_MOD_BY).setValue(editorEmail);
  sheet.getRange(row, PR_COL.LAST_MOD_TIME).setValue(new Date());
  sendToDiscord(ACTIVITY_WEBHOOK, "✏️ " + editorEmail + " updated " + name);

  const editedCol = e.range.getColumn();

  // New lead added — fires the first time the Name cell in a row is filled in
  if (editedCol === PR_COL.NAME && !e.oldValue) {
    sendToDiscord(NEWLEAD_WEBHOOK, "📥 New lead added: " + name);
  }

  // Sponsor confirmed — fires when Status is changed to "Confirmed"
  if (editedCol === PR_COL.STATUS) {
    const status = sheet.getRange(row, PR_COL.STATUS).getValue();
    if (status === "Confirmed") {
      sendToDiscord(CONFIRMED_WEBHOOK, "🎉 Sponsor confirmed: " + name + "!");
    }
  }
}

// Handles edits on the Social Media Tasks tab
function handleSocialEdit(e) {
  const sheet = e.range.getSheet();
  const row = e.range.getRow();
  if (row === 1) return;

  const editorEmail = Session.getActiveUser().getEmail() || "Someone";
  const name = sheet.getRange(row, SOCIAL_COL.NAME).getValue();

  sheet.getRange(row, SOCIAL_COL.LAST_MOD_BY).setValue(editorEmail);
  sheet.getRange(row, SOCIAL_COL.LAST_MOD_TIME).setValue(new Date());
  sendToDiscord(ACTIVITY_WEBHOOK, "✏️ " + editorEmail + " updated " + name);

  const editedCol = e.range.getColumn();

  // Task posted — fires when Status is changed to "Posted"
  if (editedCol === SOCIAL_COL.STATUS) {
    const status = sheet.getRange(row, SOCIAL_COL.STATUS).getValue();
    if (status === "Posted") {
      sendToDiscord(POSTED_WEBHOOK, "📢 Just posted: " + name);
    }
  }
}

// Runs once a day on a timer (you'll set this up in Step 4) — checks PR follow-ups
function checkFollowUps() {
  const sheet = SpreadsheetApp.getActive().getSheetByName(PR_SHEET);
  const data = sheet.getDataRange().getValues();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const status = row[PR_COL.STATUS - 1];
    const followUpDate = row[PR_COL.NEXT_FOLLOWUP - 1];
    const assigned = row[PR_COL.ASSIGNED - 1];
    const name = row[PR_COL.NAME - 1];

    if (!followUpDate || status === "Confirmed" || status === "Rejected") continue;

    const fDate = new Date(followUpDate);
    fDate.setHours(0, 0, 0, 0);

    if (fDate.getTime() === today.getTime()) {
      sendToDiscord(FOLLOWUP_WEBHOOK, "🔔 Follow-up due TODAY: " + name + " — " + assigned);
    } else if (fDate.getTime() < today.getTime()) {
      sendToDiscord(FOLLOWUP_WEBHOOK, "⚠️ OVERDUE follow-up: " + name + " — " + assigned);
    }
  }
}
```

Click **Save** (the disk icon), name the project something like "Discord CRM Script."

### Step 4 — Turn the triggers on

A trigger tells Google "run this function automatically." On the left sidebar of the Apps Script editor, click the **alarm clock icon (Triggers)** → **+ Add Trigger**, and set up two:

**Trigger 1 — reacts to edits:**
- Function: `onEditInstallable`
- Event source: `From spreadsheet`
- Event type: `On edit`
- Click Save. The first time, Google will ask you to **authorize** the script (click through "Advanced → Go to [project name] (unsafe)" — this warning appears for all personal scripts, it's normal and safe since you wrote it).

**Trigger 2 — checks follow-ups daily:**
- Function: `checkFollowUps`
- Event source: `Time-driven`
- Type: `Day timer` → pick a time, e.g. 9am–10am
- Click Save.

### Step 5 — Test it

Go back to your sheet and test both tabs:
- In "Brands & Sponsors," add a test row and fill in a Name. Check that columns W/X fill in automatically, a message shows up in `#activity-log`, and `#pr-new-leads` gets the "new lead" message. Then change its Status to "Confirmed" and check `#core-team-chat`.
- In "Social Media Tasks," add a test row, fill in a Name, then set Status to "Posted." Check that columns J/K fill in and `#social-posted` gets a message.

If nothing posts, double check you pasted the correct webhook URLs and that the trigger shows a green checkmark (not an error) under the Triggers tab.

That's the whole integration — a bit more setup than Airtable's one-click Automations, but it's free, it's yours, and once it's running nobody has to touch it again.

---

## Part E — Bots (keep this list short, you need one, maybe two)

**Sesh** (sesh.fyi) — meeting/event reminders. When someone books a sponsor call (Status → Meeting Scheduled), they post the time in `#pr-in-progress` and use Sesh to set a reminder + RSVP so the team doesn't forget.

**Carl-bot** (carl.gg) — optional. Server-level logging (joins, role changes) and simple custom commands if the team keeps asking the same onboarding questions. Not required for the CRM itself to work.

You don't need a ticketing bot, a forms bot, or a custom-coded bot beyond the small script in Part D.

---

## Part F — Discord-Only Lite Mode (skip Google Sheets entirely)

Use this only if the team is small (under ~15 people) and you want zero outside tools. Trade-off: no live dashboard, no clean per-record activity trail, manual counting.

- Turn the `-hub` channels into **Forum Channels** instead of text channels.
- Each **post** = one brand or one content task. Pin the field list from Part C as the forum's required template.
- Use Forum **Tags** for Status — Discord allows up to 20 tags per forum, your status list fits. Members filter by tag instead of querying.
- Use **Sesh** `/remind` inside each thread for follow-up dates — it pings the assigned member's role when due.
- Role-based access = same channel permissions as Part A/B.
- Dashboard = Core Team eyeballs the tag filters and counts manually, roughly weekly.
- Activity history = Discord's Audit Log only covers channel/role changes, not edits inside a thread — you lose the "who changed what" trail per record.

---

## Requirement → Where It Actually Lives

| Requirement | Hybrid mode (Google Sheets) | Lite mode |
|---|---|---|
| 1. Brand database | Sheets Tab 1 | Forum post + template |
| 2. Outreach tracking | Status + date columns | Forum tags + dates in post |
| 3. Follow-up system | QUERY tabs + Apps Script webhook alerts | Sesh reminders per thread |
| 4. Team management | Assigned column + `@PR Team`/`@Social Team` roles | Channel + role per team |
| 5. Social media section | Sheets Tab 2 | Forum in Social categories |
| 6. Dashboard | Dashboard tab (COUNTIF + charts) | Manual weekly count |
| 7. Role-based access | 4 Discord roles + stage-filtered Sheets view tabs (tab-level, not airtight) | Discord roles only |
| Activity history | Apps Script-stamped Last Modified columns + `#activity-log` | Not really possible |

---

## Build Order

1. Create the 4 roles
2. Create categories + channels, lock permissions per team (PR / Social / Core)
3. Create the Google Sheet — both tabs, all columns, dropdowns set up
4. Build the QUERY view tabs for each of the 4 PR stages + 4 Social stages + follow-ups
5. Share the file, pin each tab's link in its matching channel
6. Build the Dashboard tab + chart, pin it in `#master-dashboard`
7. Get the 5 Discord webhook URLs, paste them into the Apps Script, save, and turn on both triggers
8. Add Sesh (and Carl-bot if you want the extra logging)
9. Add 3–4 test brand records and social tasks — confirm the follow-up alert, activity log, and stage webhooks actually fire
10. Onboard the team: assign roles, they'll see their pinned stage views waiting in their team's channels

Once step 9 works, it runs itself — nobody has to remember to update a second place.
