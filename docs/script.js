function loadEntries(key) {
  return JSON.parse(localStorage.getItem(key) || '[]');
}

function saveEntry(key, entry) {
  const entries = loadEntries(key);
  entries.push(entry);
  localStorage.setItem(key, JSON.stringify(entries));
}

function formatDate(date) {
  return date.toISOString().split('.')[0];
}

function renderLogs() {
  const logContainer = document.getElementById('logContainer');
  logContainer.textContent = '';
  const seizures = loadEntries('seizures');
  const medications = loadEntries('medications');
  if (seizures.length === 0 && medications.length === 0) {
    logContainer.textContent = 'No entries yet.';
    return;
  }

  const createList = (title, entries) => {
    const section = document.createElement('div');
    const heading = document.createElement('h3');
    heading.textContent = title;
    section.appendChild(heading);
    const ul = document.createElement('ul');
    for (const text of entries) {
      const li = document.createElement('li');
      li.textContent = text;
      ul.appendChild(li);
    }
    section.appendChild(ul);
    return section;
  };

  if (seizures.length > 0) {
    const list = seizures.map(e => `${e.time} - ${e.duration}s - ${e.notes}`);
    logContainer.appendChild(createList('Seizures', list));
  }
  if (medications.length > 0) {
    const list = medications.map(e => `${e.time} - ${e.name} - ${e.dose} - ${e.notes}`);
    logContainer.appendChild(createList('Medications', list));
  }
}

document.getElementById('seizureForm').addEventListener('submit', e => {
  e.preventDefault();
  const entry = {
    time: formatDate(new Date()),
    duration: document.getElementById('seizureDuration').value,
    notes: document.getElementById('seizureNotes').value
  };
  saveEntry('seizures', entry);
  e.target.reset();
  renderLogs();
});

document.getElementById('medicationForm').addEventListener('submit', e => {
  e.preventDefault();
  const entry = {
    time: formatDate(new Date()),
    name: document.getElementById('medicationName').value,
    dose: document.getElementById('medicationDose').value,
    notes: document.getElementById('medicationNotes').value
  };
  saveEntry('medications', entry);
  e.target.reset();
  renderLogs();
});

window.addEventListener('load', renderLogs);
