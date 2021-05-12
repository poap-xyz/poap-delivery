# New Deliveries format

For submitting a new delivery to the backend, the list needs the following format
```json
[
  {
    "address": string,
    "events": number[]
  },
  ...
]
``` 
Notes:
* Address can also be an ENS.
* Events should be a list of valid event IDs

## To run the scirpt
1. Python is required (v2 or v3)
2. Create a `tokens.csv` on this folder with the following format: `address/ens;events_id`
```csv
poap.eth;1,2
0x20392b9607dc8cC49BEa5B7B90E65d6251617538;1
```
If all address will receive the same events, you can ignore the events column and on the `format.py` file, set the array `EVENTS_ID` with the correct IDs.
3. Run the script `python3 format.py`
4. Results will be created on `output.json`
