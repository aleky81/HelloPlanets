import csv
import os
from datetime import datetime

SEIZURE_FILE = 'seizures.csv'
MEDICATION_FILE = 'medications.csv'


def log_seizure():
    """Ask the user for seizure details and store them."""
    timestamp = datetime.now().isoformat(timespec='seconds')
    duration = input('How long did the seizure last (seconds)? ')
    notes = input('Any notes? ')
    with open(SEIZURE_FILE, 'a', newline='') as f:
        writer = csv.writer(f)
        writer.writerow([timestamp, duration, notes])
    print('Seizure logged!\n')


def log_medication():
    """Ask the user for medication details and store them."""
    timestamp = datetime.now().isoformat(timespec='seconds')
    name = input('Medication name: ')
    dose = input('Dose amount: ')
    notes = input('Any notes? ')
    with open(MEDICATION_FILE, 'a', newline='') as f:
        writer = csv.writer(f)
        writer.writerow([timestamp, name, dose, notes])
    print('Medication logged!\n')


def view_log(filename, headers):
    """Print the contents of a log file if it exists."""
    if not os.path.exists(filename):
        print('No entries yet.\n')
        return
    with open(filename, newline='') as f:
        reader = csv.reader(f)
        print(', '.join(headers))
        for row in reader:
            print(', '.join(row))
    print()


def main():
    while True:
        print('--- Dog Seizure Tracker ---')
        print('1. Log seizure')
        print('2. Log medication')
        print('3. View seizure log')
        print('4. View medication log')
        print('5. Exit')
        choice = input('Choose an option: ')
        if choice == '1':
            log_seizure()
        elif choice == '2':
            log_medication()
        elif choice == '3':
            view_log(SEIZURE_FILE, ['Time', 'Duration', 'Notes'])
        elif choice == '4':
            view_log(MEDICATION_FILE, ['Time', 'Medication', 'Dose', 'Notes'])
        elif choice == '5':
            print('Goodbye!')
            break
        else:
            print('Not a valid choice. Try again.\n')


if __name__ == '__main__':
    main()
