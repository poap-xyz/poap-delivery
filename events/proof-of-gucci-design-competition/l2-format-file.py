import json
from web3 import Web3
import os

# Address of the Proof of Gucci Design Competition Airdrop Contract
ADDRESS = '0x20C048c146B07D7Ef0A469858F9bb38Ac7d0C8Fe'

HTTPS_PROVIDER = '__ADD_ME__'

def get_abi(name):
    abi_file = os.path.join('..', '..', 'eth', 'artifacts', name)
    if os.path.exists(abi_file):
        with open(abi_file, 'r') as f:
            abi = json.load(f)
        return abi.get('abi')

def main():
    print('> Starting Proof of Gucci Design Competition formatting')
    formatted_output = {}
    claimed_addresses = []
    addresses_list = []
    # Instantiate web3
    provider = Web3.HTTPProvider(HTTPS_PROVIDER)
    web3 = Web3(provider)

    # Get the contract
    deliveryContract = web3.eth.contract(address=ADDRESS, abi=get_abi('PoapAirdrop.json'))

    with open('output.json', 'r') as json_file:
        data = json.load(json_file)

        for address, events in data.items():
            chk_address = web3.toChecksumAddress(address)
            addresses_list.append(address)

            # Check if the user claimed the address
            if not deliveryContract.functions.claimed(chk_address).call():
                formatted_output[address] = events
                # Print in green
                print(address, u'\033[92m didn\'t claim \033[0m')
            else:
                claimed_addresses.append(address)
                # Print in red
                print(address, u'\033[91m claimed \033[0m')

    with open('output-l2.json', 'w') as outfile:
        json.dump(formatted_output, outfile, indent=4)

    print('')
    print('>> Amount from original file:', len(data))
    print('>> Amount of addresses that didn\'t claimed:', len(formatted_output))
    print('>> Amount of addresses that claimed:', len(claimed_addresses))
    amount_validation = 'SUCCESS' if len(formatted_output) + len(claimed_addresses) == len(data) else 'ERROR'
    print('>>> Amount validation:', amount_validation)
    print('')
    duplicate_validation = 'SUCCESS' if len(formatted_output) + len(claimed_addresses) == len(set(addresses_list)) else 'ERROR'
    print('>>> Duplicate address validation:', duplicate_validation)
    print('')

    print('> End of script')

if __name__ == '__main__':
    main()
