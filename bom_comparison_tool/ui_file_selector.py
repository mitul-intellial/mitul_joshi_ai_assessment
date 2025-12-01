import tkinter as tk
from tkinter import filedialog, messagebox
from typing import Tuple, List, Optional

class FileSelectorApp:
    """
    A Tkinter application for selecting Master and Target BOM files.
    """
    def __init__(self, master: tk.Tk):
        self.master = master
        master.title("BOM Comparison - File Selection")
        master.geometry("600x450") # Set a fixed size for better layout control
        master.resizable(False, False) # Prevent resizing

        self.master_file_path: Optional[str] = None
        self.target_file_paths: List[str] = []
        self.result_ready = False # Flag to indicate if valid files were selected

        # --- Instructions ---
        instructions_text = (
            "Please select your Master BOM file (XLSX only) and 1 to 5 Target BOM files "
            "for comparison. Click 'Compare BOMs' when ready."
        )
        self.instructions_label = tk.Label(master, text=instructions_text, wraplength=550, justify="left")
        self.instructions_label.pack(pady=10)

        # --- Master File Selection ---
        self.master_frame = tk.LabelFrame(master, text="Master BOM File (XLSX)", padx=10, pady=10)
        self.master_frame.pack(pady=5, padx=20, fill="x")

        self.master_label_text = tk.StringVar()
        self.master_label_text.set("No Master file selected.")
        self.master_file_label = tk.Label(self.master_frame, textvariable=self.master_label_text, wraplength=400, justify="left")
        self.master_file_label.pack(side="left", fill="x", expand=True)

        self.master_button = tk.Button(self.master_frame, text="Select Master", command=self._select_master_file)
        self.master_button.pack(side="right", padx=(10, 0))

        # --- Target Files Selection ---
        self.target_frame = tk.LabelFrame(master, text="Target BOM Files (1-5 files)", padx=10, pady=10)
        self.target_frame.pack(pady=5, padx=20, fill="x")

        self.target_label_text = tk.StringVar()
        self.target_label_text.set("No Target files selected.")
        self.target_file_label = tk.Label(self.target_frame, textvariable=self.target_label_text, wraplength=400, justify="left")
        self.target_file_label.pack(side="left", fill="x", expand=True)

        self.target_button = tk.Button(self.target_frame, text="Select Targets", command=self._select_target_files)
        self.target_button.pack(side="right", padx=(10, 0))

        # --- Action Buttons ---
        self.button_frame = tk.Frame(master)
        self.button_frame.pack(pady=20)

        self.compare_button = tk.Button(self.button_frame, text="Compare BOMs", command=self._validate_and_submit, width=15, height=2)
        self.compare_button.pack(side="left", padx=10)

        self.cancel_button = tk.Button(self.button_frame, text="Cancel", command=self._on_closing, width=15, height=2)
        self.cancel_button.pack(side="right", padx=10)

        # Handle window closing event
        master.protocol("WM_DELETE_WINDOW", self._on_closing)

    def _select_master_file(self):
        """Opens a file dialog to select a single Master BOM file (XLSX only)."""
        filetypes = [("Excel files", "*.xlsx")]
        fpath = filedialog.askopenfilename(
            parent=self.master,
            title="Select Master BOM File",
            filetypes=filetypes
        )
        if fpath:
            self.master_file_path = fpath
            self.master_label_text.set(f"Selected: {self.master_file_path}")
        else:
            self.master_label_text.set("No Master file selected.")
            self.master_file_path = None

    def _select_target_files(self):
        """Opens a file dialog to select 1 to 5 Target BOM files."""
        filetypes = [
            ("All supported files", "*.csv *.xlsx *.docx *.pdf *.txt"),
            ("CSV files", "*.csv"),
            ("Excel files", "*.xlsx"),
            ("Word documents", "*.docx"),
            ("PDF files", "*.pdf"),
            ("Text files", "*.txt")
        ]
        fpaths = filedialog.askopenfilenames(
            parent=self.master,
            title="Select Target BOM Files (1-5)",
            filetypes=filetypes
        )
        if fpaths:
            self.target_file_paths = list(fpaths)
            self.target_label_text.set("Selected:\n" + "\n".join(self.target_file_paths))
        else:
            self.target_label_text.set("No Target files selected.")
            self.target_file_paths = []

    def _validate_and_submit(self):
        """Validates selections and closes the window if valid."""
        if not self.master_file_path:
            messagebox.showerror("Validation Error", "Please select a Master BOM file.")
            return

        if not self.target_file_paths:
            messagebox.showerror("Validation Error", "Please select at least one Target BOM file.")
            return

        if not (1 <= len(self.target_file_paths) <= 5):
            messagebox.showerror("Validation Error", "You must select between 1 and 5 Target BOM files.")
            return
        
        self.result_ready = True
        self.master.destroy() # Close the window

    def _on_closing(self):
        """Handles window close event, setting result_ready to False."""
        self.result_ready = False
        self.master.destroy()

def launch_file_selector() -> Tuple[Optional[str], Optional[List[str]]]:
    """
    Launches the Tkinter file selection dialog.

    Returns:
        A tuple containing (master_file_path, target_file_paths_list).
        Returns (None, None) if the user cancels the selection.
    """
    root = tk.Tk()
    app = FileSelectorApp(root)
    root.mainloop() # This blocks until the window is closed

    if app.result_ready:
        return app.master_file_path, app.target_file_paths
    else:
        return None, None

if __name__ == "__main__":
    # Example usage when run directly
    master, targets = launch_file_selector()
    if master and targets:
        print(f"Master File: {master}")
        print(f"Target Files: {targets}")
    else:
        print("File selection cancelled.")