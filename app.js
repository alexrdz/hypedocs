// DOM Elements
const tableBody = document.querySelector('tbody');
const addRowButton = document.querySelector('#add-row');
const saveButton = document.querySelector('.save');

// Load and render initial data
function renderTable() {
    const data = getFromLocalStorage();
    tableBody.innerHTML = '';
    data.forEach((row, index) => {
        const rowElement = document.createElement('tr');
        rowElement.innerHTML = `
            <td contenteditable="true" data-key="title">${row.title}</td>
            <td data-key="date">${row.date}</td>
            <td contenteditable="true" data-key="description">${row.description}</td>
            <td contenteditable="true" data-key="tags">${row.tags}</td>
            <td contenteditable="true" data-key="value">${row.value}</td>
            <td data-cluster="align:center justify:between">
              <button class="save">Save</button>
              <button class="delete" data-index="${index}">Delete</button>
              </td>
        `;
        tableBody.appendChild(rowElement);
        addButtonEventListeners();
    });
}

// Add a new row
addRowButton.addEventListener('click', () => {
    const newRow = { title: '', date: new Date().toLocaleString(), description: '', tags: '', value: '' };
    const data = getFromLocalStorage();
    data.push(newRow);
    saveToLocalStorage(data);
    renderTable();

    // Add focus to the first cell of the new row
    const lastRow = tableBody.lastElementChild;
    if (lastRow) {
        const firstCell = lastRow.querySelector('td[data-key="title"]');
        if (firstCell) {
            firstCell.focus();
        }
    }
});


// Attach save and delete event listeners
function addButtonEventListeners() {
  document.querySelectorAll('.delete').forEach(button => {
    button.addEventListener('click', (e) => {
        const rowIndex = e.target.getAttribute('data-index');
        deleteRow(rowIndex);
    });
  });

  document.querySelectorAll('.save').forEach(button => {
    button.addEventListener('click', () => {
      const rows = Array.from(tableBody.querySelectorAll('tr'));
      const data = rows.map(row => {
          const cells = row.querySelectorAll('td');
          return Array.from(cells).reduce((acc, cell) => {
              if (cell.dataset.cluster) return acc;
              const key = cell.getAttribute('data-key');
              acc[key] = cell.textContent;
              return acc;
          }, {});
      });
      saveToLocalStorage(data);
      alert('Data saved!');
    });
  });
}

// Initialize table on page load
document.addEventListener('DOMContentLoaded', renderTable);



// Functions
const storageKey = 'editableTableData';

// Save data to localStorage
function saveToLocalStorage(data) {
    localStorage.setItem(storageKey, JSON.stringify(data));
}

// Retrieve data from localStorage
function getFromLocalStorage() {
    const data = localStorage.getItem(storageKey);
    return data ? JSON.parse(data) : [];
}

// Clear data from localStorage (optional utility)
function clearLocalStorage() {
    localStorage.removeItem(storageKey);
}

function deleteRow(index) {
  const data = getFromLocalStorage();
  data.splice(index, 1); // Remove the row at the specified index
  saveToLocalStorage(data); // Save updated data
  renderTable(); // Re-render the table
}


document.querySelector('#download-json').addEventListener('click', () => {
  const data = getFromLocalStorage();
  const jsonBlob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(jsonBlob);
  link.download = 'table-data.json';
  link.click();
});

document.querySelector('#download-csv').addEventListener('click', () => {
  const data = getFromLocalStorage();

  // Convert data to CSV format
  const headers = ['Title', 'Date', 'Description', 'Tags', 'Value'];
  const rows = data.map(row => [
      `"${row.title}"`,
      `"${row.date}"`,
      `"${row.description}"`,
      `"${row.tags}"`,
      `"${row.value}"`
  ].join(','));

  const csvContent = [headers.join(','), ...rows].join('\n');

  // Create and download CSV file
  const csvBlob = new Blob([csvContent], { type: 'text/csv' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(csvBlob);
  link.download = 'table-data.csv';
  link.click();
});
