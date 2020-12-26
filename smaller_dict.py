import json

major_systems_mappings = {
    0: ['S'],
    1: ['T', 'D'],
    2: ['N'],
    3: ['M'],
    4: ['R'],
    5: ['L'],
    6: ['Sh', 'Ch'],
    7: ['K', 'G'],
    8: ['F', 'V'],
    9: ['P', 'B'],
}

# 1 json per number's array entry in major_systems_mapping
# right now I'm exporting silly json that looks like { 0: [...] } with no additional entries
# realistically I should turn these into prefix trees in python, but im interested in the memory issues over in js (for now)
def write_smaller_json_file(mappings, giant_json):
    for mapping in mappings:
        m = mapping.lower()
        filename = './src/mapping_' + m + '.json'
        with open(filename, 'w') as small_file:
            small_file.seek(0) # overwrite if needed
            print(f'writing for {m}..')
            new_json = filter(lambda v: v.startswith(m), giant_json)
            new_json = list(new_json)
            json.dump({ m: new_json }, small_file)
            
# 1 js array export file per number's array entry in major_systems_mapping
# exporting so these are files like `export default ["shoe", ...];`
def write_smaller_js_exports_files(mappings, giant_json):
    for mapping in mappings:
        m = mapping.lower()
        filename = './src/mapping_' + m + '.ts'
        with open(filename, 'w') as small_file:
            small_file.seek(0) # overwrite if needed
            print(f'writing for {m}..')
            big_array = list(filter(lambda v: v.startswith(m), giant_json))
            small_file.write(f'export default {big_array};')
            
            
def run():
    print('ok, lets try importing...')
    with open('./src/dictionaries/dictionary.json', 'r') as giant_json_file:
        print('**hacker voice** i\'m in')
        giant_json = json.load(giant_json_file)
        for mappings in major_systems_mappings.values():
            write_smaller_js_exports_files(mappings, giant_json) # todo nested with() is questionable
    print('Survived!')

run()