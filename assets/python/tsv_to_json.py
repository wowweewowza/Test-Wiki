import os
import re
import json

# Get file name from user

file_name = input('FILE NAME\n> ')

# Get directory of current file.
script_dir = os.path.dirname(os.path.abspath(__file__))

# Get data path

data_path = os.path.abspath(os.path.join(script_dir, '..', 'tsv', f'{file_name}.tsv'))

# JSON data output path

output_path = os.path.abspath(os.path.join(script_dir, '..', 'json', f'{file_name}.json'))
data_root = []

def main():

    data_root = make_data_root()
    # print(data_root[0])
    write_to_json(data_root)

def clean_purviews(purviews):
    purview_typos = {
        'Beasts': ['Beast', 'Berasts'],
        'Journeys': ['Journey', 'Journeys.'],
        'Fertility': ['Feritlity', 'Feritility'],
        'Health' : ['Healtrh'],
        'Earth': ['Earath'],
        'Wild': ['. Wild']
    }
    
    cleaned_purviews = []
    
    typo_map = {typo: correct for correct, typos in purview_typos.items() for typo in typos}

    cleaned_purviews = [typo_map.get(word, word) for word in purviews]
    
    return cleaned_purviews
    
def write_to_json(data_root):
    with open(output_path, 'w', encoding='utf-8') as file:
        json.dump(data_root, file, indent=4, ensure_ascii=False)

def make_data_root():
    
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
                    cleaned_purviews = clean_purviews(vals)
                    data_entry[key] = list(set(cleaned_purviews))
                else:
                    data_entry[key] = val

            data_root.append(data_entry)
    return data_root

def expand_parenthesis(match):
    main_word = match.group(1)
    inner_words = [x.strip() for x in match.group(2).split(',')]
    output = ', '.join([f'{main_word} ({x})' for x in inner_words])
    return output

if __name__ == "__main__":
    main()