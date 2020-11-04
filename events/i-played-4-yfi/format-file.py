import json

EVENT_ID = 478

def main():
    print('> Starting Event formatting')
    formatted_output = {}
    addresses_list = []
    with open('original.txt') as original_file:
        for each in original_file:
            addresses_list.append(each.strip().lower())
            formatted_output[each.strip().lower()] = [EVENT_ID, ]

    with open('output.json', 'w') as outfile:
        json.dump(formatted_output, outfile, indent=4)

    original_file_length = sum(1 for line in open('original.txt', 'r') if line.strip())
    print('')
    print('>> Amount from original file:', original_file_length)
    print('>> Amount of addresses formatted:', len(formatted_output))
    amount_validation = 'SUCCESS' if len(formatted_output) == original_file_length else 'ERROR'
    print('>>> Amount validation:', amount_validation)
    print('')

    duplicate_validation = 'SUCCESS' if len(addresses_list) == len(set(addresses_list)) else 'ERROR'
    print('>>> Duplicate address validation:', duplicate_validation)
    print('')

    print('> End of script')

if __name__ == '__main__':
    main()
