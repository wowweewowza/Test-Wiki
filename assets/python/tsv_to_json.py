import os
import re
import json

# Get directory of current file.
script_dir = os.path.dirname(os.path.abspath(__file__))

# Get data path

data_path = os.path.abspath(os.path.join(script_dir, '..', 'tsv', 'data.tsv'))

# JSON data output path

output_path = os.path.abspath(os.path.join(script_dir, '..', 'json', 'data.json'))

def main():

    data_root = []

    with open(data_path, 'r', encoding='utf-8') as file:
        first_line = file.readline().strip().lower()
        keys = first_line.split('\t')
        
        for line in file:
            data_entry = {}
            row = line.strip('\n')
            values = row.split('\t')

            for i, key in enumerate(keys):
                val = values[i]
                if key == 'callings':
                    vals = val.split(',')
                    vals = [x.strip() for x in vals]
                    data_entry[key] = vals
                elif key == 'purviews':
                    pattern = r'(\w+)\s\(([^)]+)\)'
                    result = re.sub(pattern, expand_parenthesis, val)
                    vals = [x.strip() for x in result.split(',')]
                    data_entry[key] = vals
                else:
                    data_entry[key] = val

            data_root.append(data_entry)

    with open(output_path, 'w', encoding='utf-8') as file:
        json.dump(data_root, file, indent=4, ensure_ascii=False)

    print(data_root[0])

def expand_parenthesis(match):
    main_word = match.group(1)
    inner_words = [x.strip() for x in match.group(2).split(',')]
    output = ', '.join([f'{main_word} ({x})' for x in inner_words])
    return output

if __name__ == "__main__":
    main()