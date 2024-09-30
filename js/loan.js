function saveToLocalStorage(records) {
    localStorage.setItem('records', JSON.stringify(records));
  }

  // Function to load records from localStorage
  function loadFromLocalStorage() {
    const records = localStorage.getItem('records');
    return records ? JSON.parse(records) : [];
  }

  // Function to render records in the table
  function renderRecords(records) {
    const table = document.getElementById('recordsBody');
    table.innerHTML = ''; // Clear existing records
    records.forEach((record, index) => {
      const row = table.insertRow();
      const typeClass = record.transactionType === 'give' ? 'text-red-500' : 'text-green-500';
      row.innerHTML = `
        <td class="border px-4 py-2 border-gray-600">${record.name}</td>
        <td class="border px-4 py-2 border-gray-600">${record.amount}</td>
        <td class="border px-4 py-2 border-gray-600">${record.item}</td>
        <td class="border px-4 py-2 border-gray-600 ${typeClass}">${record.transactionType.charAt(0).toUpperCase() + record.transactionType.slice(1)}</td>
        <td class="border px-4 py-2 border-gray-600">
          <button class="bg-green-500 flex justify-center align-center text-white p-1 rounded" onclick="deleteRow(${index})"><i class="fa-solid fa-check p-2"></i></button>
        </td>
      `;
    });
  }

  // Function to delete a row and update localStorage
  function deleteRow(index) {
    records.splice(index, 1);
    saveToLocalStorage(records);
    renderRecords(records);
  }

  // Initializing records array with data from localStorage
  let records = loadFromLocalStorage();
  renderRecords(records);

  document.getElementById('createRecord').addEventListener('click', function () {
    const name = document.getElementById('name').value;
    const amount = document.getElementById('amount').value;
    const item = document.getElementById('item').value;
    const transactionType = document.getElementById('transactionType').value;

    if (name && amount) {
      const record = { name, amount, item, transactionType };
      records.push(record);
      saveToLocalStorage(records);
      renderRecords(records);
      clearInputs();
    }
  });

  function clearInputs() {
    document.getElementById('name').value = '';
    document.getElementById('amount').value = '';
    document.getElementById('item').value = '';
    document.getElementById('transactionType').value = 'give';
  }
