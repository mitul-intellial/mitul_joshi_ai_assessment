#PROMPT 1: MASTER PROMPT
Act as a senior Python developer.

I need to build a BOM Comparison Tool as per these requirements:

[Software Requirement: BOM Comparison Tool
1. Purpose
The tool will compare a Master Bill of Materials (BOM) with one or more revised BOM files and
visually show the differences.
2. Input Requirements
The user must upload a Master BOM in XLSX format (this is the source file).
The user can then select 1 to 5 target files to compare against the Master BOM.
Target files may be in any of the following formats: CSV, XLSX, DOCX, PDF, TXT.
The tool must parse and process all supported formats.
3. Comparison Process
When the user clicks the Compare button:
The software will read the source and target files.
It will compare fields such as MPN, Quantity, Reference Designator (Ref Des),
Description, etc.
Differences will be detected between the Master BOM and each target file.

4. User Interface Requirements
Show a side-by-side table view of the Master BOM and each selected target BOM.
Highlight differences using color coding for easy visual identification.
Each comparison should be clearly separated and readable.
5. Output Requirements
The user must be able to save the comparison result.
The saved result should be downloadable in JSON format.
The JSON file should contain all comparison details and must be readable later by the
user.]

What I want from you first:
1. A proposed folder structure
2. Required libraries
3. A step-by-step coding plan
4. A clear separation of responsibilities between components

Key technical expectations:
- Read Master BOM (xlsx)
- Read 1 to 5 target BOMs (csv, xlsx, docx, pdf, txt)
- Extract fields: MPN, Quantity, Reference Designator, Description
- Compare with Master BOM
- Output difference results
- Export result as JSON

Constraints:
- Keep solution simple and realistic for a 2–3 hr coding assessment
- Focus on core comparison logic
- Suggest how to detect unmatched items, missing fields, and discrepancies

Do not generate code yet.
Just provide design and architecture.

#PROMPT 2 — Loader Code for File Support
Now write loader functions for each supported format, following the proposed structure.

Requirements:
- Return normalized list of parts using standard keys:
  ["MPN", "Quantity", "RefDes", "Description"]
- Handle missing or alternate column names
- Use lightweight parsing:
  XLSX: openpyxl
  CSV: built-in csv
  TXT: simple line parsing using split
  DOCX: python-docx
  PDF: try using PyPDF2 to extract text
- If parser fails, return a structured error

#PROMPT 3 — Comparison Logic:
Write comparator.py with a function:
compare_bom(master_list, target_list)

It should:
- match items based on MPN
- detect quantity mismatch
- detect missing entries
- detect description differences
- detect extra refdes items
- return structured comparison dict:
    {
      "missing_items": [...],
      "extra_items": [...],
      "mismatched_quantity": [...],
      "mismatched_description": [...],
      "matched": [...]
    }

Keep logic clean and commented.

#PROMPT 4 — Main Runner:
Write main.py:

Flow:
1. Accept master file path
2. Accept 1–5 target paths
3. Auto-detect file type
4. Load all files
5. Compare master with each target
6. Print side-by-side differences as table
7. Save full comparison JSON

JSON Keys:
{
  "master_source": "<file>",
  "comparisons": [
      {
        "target_file": "...",
        "result": {...}
      }
  ]
}

Also:
- print summary counts (missing, mismatched)

#PROMPT 5 — UI Table Rendering:
Add comparison display logic to formatter.py:

Show side-by-side table:
MPN | Master Quantity | Target Quantity | Status

Status:
- OK
- MISSING
- DIFF QUANTITY
- DIFF DESCRIPTION

Highlight differences using ANSI colors:
GREEN = match
RED = mismatch
YELLOW = missing


@PROMPT6 - README Generation Prompt for BOM Comparison Tool

Act as a senior Python architect and technical documentation specialist.

I have built a “BOM Comparison Tool” based on the following requirements:

--- REQUIREMENT START ---
[PASTE FULL SOFTWARE REQUIREMENT TEXT HERE]
--- REQUIREMENT END ---

I need you to generate (or update, if it already exists) a complete README.md for this project.

Follow these rules carefully:

1. Analyse my source code structure and logic. If needed, I will paste code snippets later.
2. Keep the README realistic to what has been actually implemented.
3. If any requirement was only partially implemented due to time limits, clearly state it as an “Enhancement Area”.
4. Preserve any correct content that already exists in README.md (if present). Improve and expand instead of replacing blindly.

The README.md must include the following sections, properly formatted in Markdown:

1. Project Title & Summary  
   - 3–5 line explanation aligned to the BOM tool requirement

2. Features Implemented  
   - List only what the current code supports

3. Architecture & Folder Structure  
   - Describe key modules (loader, comparator, formatter, utils, main runner)

4. Supported Input Formats & Limitations  
   - XLSX, CSV required
   - DOCX, PDF, TXT best effort or simple extraction if partial
   - Mention any limitation if handling is simplified due to time

5. Processing Logic Overview  
   - Normalization of BOM fields
   - Matching criteria (MPN)
   - Comparison rules (Quantity, Description, RefDes)
   - Difference categories

6. Terminal UI  
   - Mention side-by-side table output and color coding
   - No heavy UI since this is prototype

7. JSON Export  
   - Show expected JSON schema and one short sample snippet

8. How to Run  
   - Installation, requirements.txt, execution steps
   - Sample command example

9. Test Coverage Summary  
   - Mention pytest tests
   - Example test cases covered

10. Enhancement Areas  
   - Parsing improvements
   - UI enhancements
   - Advanced matching logic
   - Handling column inconsistencies

11. Known Limitations  
   - Any assumptions made
   - Any format not fully supported

12. References  
   - Any public APIs, libraries used

Additional Output Rules:
- If there is an existing README.md, take it as base content and enhance it.
- Use simple, professional language.
- No placeholders; adapt to the actual implementation.
- Include final README content only. No additional commentary.


#PROMPT 7

Add a minimal UI layer to satisfy the original requirement that users must be able to "upload" and select BOM files.

Using Tkinter, generate a new module named ui_file_selector.py that:
- exposes a function `launch_file_selector()`
- opens a graphical window titled: "BOM Comparison - File Selection"
- allows the user to:
    1. pick a Master BOM file (XLSX only)
    2. pick 1 to 5 Target BOM files (formats allowed: CSV, XLSX, DOCX, PDF, TXT)
- uses filedialog.askopenfilename() for master file
- uses filedialog.askopenfilenames() for targets
- shows selected file names in readable label text
- validates:
    * master file must be selected
    * 1–5 targets must be selected
- if validation fails, show an error popup using messagebox
- if valid, close the window and return:
      (master_file_path, target_file_paths_list)

Important:
- Do NOT implement any comparison logic in this file.
- Keep it only for file selection.
- If user cancels, return (None, None).
- Keep code short, readable, commented.
- Include basic instructions text so it looks user-friendly.
- Output only the complete Python code for ui_file_selector.py.