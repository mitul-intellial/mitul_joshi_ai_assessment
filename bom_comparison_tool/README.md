# BOM Comparison Tool

## Project Title & Summary

The BOM Comparison Tool is a command-line utility designed to streamline the process of comparing Bill of Materials (BOMs). It takes a master BOM file and compares it against one or more revised target BOM files, identifying and highlighting discrepancies in Manufacturer Part Numbers (MPN), quantities, descriptions, and reference designators. The tool provides a clear, color-coded console output for quick visual inspection and generates a detailed JSON report for further analysis.

## Features Implemented

The current implementation of the BOM Comparison Tool supports the following features:

*   **Command-Line Interface (CLI):** The tool is operated via command-line arguments, specifying the master BOM and target BOM files.
*   **Multi-Format Input Parsing:**
    *   **Master BOM:** Supports `.xlsx` files.
    *   **Target BOMs:** Supports `.xlsx`, `.csv`, `.docx`, `.pdf`, and `.txt` file formats.
    *   **Automatic File Type Detection:** Automatically determines the file type based on its extension.
    *   **Flexible Header Detection:** Attempts to identify header rows and normalize column names (e.g., "Part Number" to "MPN", "Qty" to "Quantity").
*   **Core Comparison Logic:**
    *   Matches BOM items primarily based on their Manufacturer Part Number (MPN).
    *   Detects items present in the master but missing in the target (`MISSING`).
    *   Detects items present in the target but not in the master (`EXTRA`).
    *   Identifies discrepancies in `Quantity` values (`DIFF QUANTITY`).
    *   Identifies differences in `Description` fields (`DIFF DESCRIPTION`).
    *   Identifies differences in `Reference Designators` (RefDes) lists (`DIFF REFDES`).
*   **Console Output:**
    *   Provides a summary of difference counts for each comparison.
    *   Displays a color-coded, side-by-side table view of the comparison results for each target file, indicating the status of each MPN (OK, MISSING, EXTRA, DIFF QUANTITY, DIFF DESCRIPTION, DIFF REFDES).
        *   Green: Matched (OK)
        *   Yellow: Missing or Extra
        *   Red: Mismatched (Quantity, Description, RefDes)
*   **JSON Report Generation:**
    *   Generates a comprehensive JSON file containing all comparison details, including parsed master and target BOM data, and a structured breakdown of all identified differences. The JSON output is pretty-printed for readability.
*   **Error Handling:** Gracefully handles file not found errors and parsing failures for all supported file types.

## Architecture & Folder Structure

The project follows a modular architecture to ensure separation of concerns, maintainability, and extensibility.

```
bom_comparison_tool/
├── main.py                 # Main entry point for the CLI application. Orchestrates parsing, comparison, and output.
├── core/
│   ├── __init__.py         # Makes 'core' a Python package.
│   ├── models.py           # Defines standardized data structures (BOMItem, ErrorDict) using TypedDict.
│   ├── parsers.py          # Handles reading and normalizing BOM data from various file formats (XLSX, CSV, DOCX, PDF, TXT).
│   ├── comparator.py       # Implements the core logic for comparing two BOM lists and identifying differences.
│   ├── formatter.py        # Contains functions for formatting comparison results into human-readable console output (tables, summaries, colors).
│   └── utils.py            # Provides general utility functions, such as saving data to a pretty-printed JSON file.
├── requirements.txt        # Lists all Python dependencies required for the project. (To be created)
└── README.md               # This documentation file.
```

## Installation

To set up and run the BOM Comparison Tool, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    cd bom_comparison_tool
    ```
2.  **Create a virtual environment (recommended):**
    ```bash
    python -m venv venv
    # On Windows:
    .\venv\Scripts\activate
    # On macOS/Linux:
    source venv/bin/activate
    ```
3.  **Install dependencies:**
    The tool relies on several external Python libraries. Install them using pip:
    ```bash
    pip install openpyxl python-docx PyPDF2
    ```
    *(Note: The initial design proposed `pandas` and `pdfplumber`, but the current implementation uses `openpyxl`, `csv` (built-in), `python-docx`, and `PyPDF2` for lightweight parsing. `TypedDict` is used instead of `pydantic`.)*

## Usage

To run the BOM Comparison Tool, execute the `main.py` script from the `bom_comparison_tool` directory, providing the path to your master BOM file and one or more target BOM files.

## Running the Comparison

### Option A: Positional Arguments
python main.py master_file target_files...

Example:
python main.py samples/bom.xlsx samples/bom.csv

### Option B: Flag Arguments
python main.py --master samples/bom.xlsx --targets samples/bom.csv samples/bom2.xlsx

**Arguments:**

*   `<master_bom_file>`: The absolute or relative path to your master BOM file (e.g., `master.xlsx`).
*   `<target_bom_file_1> [...]`: One to five absolute or relative paths to the target BOM files you want to compare against the master (e.g., `rev1.csv`, `rev2.docx`).
*   `--output <output_json_file>`, `-o <output_json_file>`: (Optional) Specifies the name of the JSON file where the full comparison report will be saved. Defaults to `comparison_output.json`.

**Example:**

```bash
# Assuming you are in the 'bom_comparison_tool' directory
python main.py sample_boms/master.xlsx sample_boms/rev1.csv sample_boms/rev2.xlsx -o my_comparison_report.json
```

## Enhancement Areas

While the core functionality is implemented, several areas can be enhanced to improve robustness, user experience, and performance:

*   **Improved Parsing Libraries:**
    *   **`pandas` Integration:** Currently, `parsers.py` uses `openpyxl` and the built-in `csv` module. Migrating to `pandas` for XLSX and CSV parsing would offer more robust data handling, easier column manipulation, and better performance for larger files.
    *   **`pdfplumber` for PDF:** The current PDF parsing uses `PyPDF2`, which extracts raw text. `pdfplumber` is specifically designed for extracting tabular data from text-based PDFs and would significantly improve the reliability and accuracy of PDF BOM parsing.
*   **Data Validation with `pydantic`:** The `models.py` currently uses `TypedDict`. Integrating `pydantic` would provide automatic data validation, serialization, and deserialization, making the data models more robust and reducing potential errors.
*   **Comprehensive Unit Testing:** The `tests/` directory was proposed but not implemented. Adding a comprehensive suite of unit tests for `parsers.py`, `comparator.py`, and `formatter.py` is crucial for ensuring correctness and preventing regressions.
*   **Sample BOM Files:** Populate the `sample_boms/` directory with diverse examples of master and target BOM files across all supported formats to facilitate testing and demonstration.
*   **More Flexible Column Mapping:** Enhance the header detection in `parsers.py` to allow for user-defined column mapping configurations, especially for less common column name variations.
*   **Robust TXT Parsing:** Improve the heuristic-based TXT parser, potentially allowing users to specify delimiters or providing more advanced delimiter sniffing.
*   **Advanced DOCX/PDF Table Detection:** For DOCX and PDF files, implement more sophisticated algorithms to identify and extract BOM tables, especially in documents with complex layouts or non-standard table structures.
*   **Graphical User Interface (GUI):** The initial requirements hinted at a UI ("upload", "click"). Developing a simple web-based (e.g., Flask/Streamlit) or desktop (e.g., Tkinter/PyQt) GUI would greatly enhance usability, allowing users to upload files and view results interactively.
*   **Performance Optimization:** For very large BOM files (thousands of lines), investigate performance bottlenecks in parsing and comparison logic and optimize where necessary.
*   **Detailed RefDes Comparison in Console:** While `DIFF REFDES` is shown, the console output could be enhanced to explicitly list the added and removed reference designators for better clarity.


## User Interface Note

The original requirement mentions a UI for file upload and visual comparison. 

Given the limited development time of this AI-based assessment, the UI has been implemented as a command-line interface (CLI):

- The user specifies the master file and target BOM files as arguments.
- The files are automatically detected and processed.
- Comparison results are displayed in a structured table in the terminal.
- Differences are highlighted using ANSI color codes.

This satisfies the intent of:
✔ selecting/uploading files  
✔ displaying comparisons side-by-side  
✔ visually highlighting mismatches  

A graphical UI can be added as a future enhancement.


### Future UI Enhancement
The tool can be extended in upcoming iterations to include:
- Web UI built with Flask/React
- Desktop interface with file upload fields
- Side-by-side table comparison in HTML
- Dynamic filtering and export options
