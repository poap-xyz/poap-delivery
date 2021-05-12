import csv
import json

EVENTS_ID = [1]
TOKENS_FILENAME = 'tokens.csv'
OUTPUT_FILENAME = 'output.json'

def main():
    print('> Starting with address formatting')
    formatted_output = []
    with open(TOKENS_FILENAME) as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=';')
        for row in csv_reader:
            events = row[1].strip().lower() if len(row) == 2 else ''
            if events == '':
                events = EVENTS_ID
            else:
                events = [int(x.strip()) for x in events.split(',')]
            new_line = {
                "address": row[0].strip().lower(),
                "events": events
            }
            formatted_output.append(new_line)

    with open('output.json', 'w') as outfile:
        json.dump(formatted_output, outfile, indent=4)

    print('> End of formatting')

if __name__ == '__main__':
    main()
