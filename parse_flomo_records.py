import re
import json
import os

def parse_details_block(content_block):
    """Parses content blocks like '察觉与洞察' into a dictionary."""
    details = {}
    # Split by the start of a new bullet point item
    items = re.split(r'\n(?=\s*\*\s)', content_block)
    for item in items:
        if not item.strip():
            continue
        # Split only on the first colon
        parts = re.split(r'[:：]', item, maxsplit=1)
        if len(parts) == 2:
            # Clean up key from asterisks and whitespace
            key = re.sub(r'^\s*\*\s*|\s*\**\s*$', '', parts[0]).strip()
            key = key.replace('**', '') # remove bold markers
            value = parts[1].strip()
            details[key] = value
    return details

def parse_record_entry(entry_text):
    """
    Parses a single record entry using a robust block-splitting strategy.
    """
    if not entry_text.strip():
        return None

    record = {}
    # Extract header and the rest of the content
    header_match = re.search(r'\[(.*?)\]\((.*?)\)\n', entry_text, re.DOTALL)
    if not header_match:
        return None  # Should not happen with current file format
    
    record['datetime'] = header_match.group(1).strip()
    record['flomo_link'] = header_match.group(2).strip()
    content_str = entry_text[header_match.end():]

    # Use a positive lookahead to split content by headers, keeping the headers
    split_pattern = r'\n{1,}(?=\s*\**\s*(?:主题行动复盘|察觉与洞.?察|明日计划|!\[))'
    blocks = re.split(split_pattern, content_str)

    # The first block is always '今日小计'
    record['今日小计'] = re.sub(r'#行思录/.*', '', blocks[0]).strip()
    
    # Initialize other sections
    record['主题行动复盘'] = {}
    record['察觉与洞察'] = {}
    record['明日计划'] = ""

    for block in blocks[1:]:
        block = block.strip()
        if not block:
            continue

        if re.match(r'\s*\**\s*主题行动复盘', block):
            content = re.sub(r'^\s*\**\s*主题行动复盘\s*\**\s*[:：]?', '', block, 1).strip()
            lines = content.split('\n')
            title = ""
            # If the first line is not a detail item, it's the title
            if lines and not lines[0].strip().startswith('*'):
                title = lines.pop(0).strip()
            
            details_content = "\n".join(lines)
            record['主题行动复盘'] = {
                'title': title,
                'details': parse_details_block(details_content)
            }

        elif re.match(r'\s*\**\s*察觉与洞.?察', block):
            content = re.sub(r'^\s*\**\s*察觉与洞.?察\s*\**\s*[:：]?', '', block, 1).strip()
            record['察觉与洞察'] = parse_details_block(content)

        elif re.match(r'\s*\**\s*明日计划', block):
            content = re.sub(r'^\s*\**\s*明日计划\s*\**\s*[:：]?', '', block, 1).strip()
            record['明日计划'] = content

        elif block.startswith('!['):
            img_match = re.search(r'\((.*?)\)', block)
            if img_match:
                record['image_url'] = img_match.group(1).strip()
    
    return record


def main():
    """
    Main function to read the markdown file, parse it, and incrementally
    update a main JSON file, while providing a temp file for verification.
    """
    input_filename = '记录.md'
    main_json_filename = '行思录.json'
    temp_json_filename = 'tem_行思录.json'

    # 1. Parse the source markdown file
    if not os.path.exists(input_filename):
        print(f"错误: 输入文件 '{input_filename}' 未找到。")
        return

    with open(input_filename, 'r', encoding='utf-8') as f:
        content = f.read()

    entries_text = re.split(r'(?=\[\d{4}-\d{2}-\d{2})', content)
    
    current_records = []
    for entry_text in entries_text:
        if entry_text.strip():
            parsed_record = parse_record_entry(entry_text)
            if parsed_record:
                current_records.append(parsed_record)

    if not current_records:
        print(f"在 '{input_filename}' 中没有找到可解析的记录。")
        return

    # 2. Write the temporary verification file
    with open(temp_json_filename, 'w', encoding='utf-8') as f:
        json.dump(current_records, f, ensure_ascii=False, indent=2)
    print(f"成功！已将 '{input_filename}' 的解析结果保存至临时文件 '{temp_json_filename}' 供您查阅。")

    # 3. Read existing records from the main JSON file
    existing_records = []
    if os.path.exists(main_json_filename):
        try:
            with open(main_json_filename, 'r', encoding='utf-8') as f:
                # Handle empty file case
                file_content = f.read()
                if file_content:
                    existing_records = json.loads(file_content)
                if not isinstance(existing_records, list):
                    print(f"警告: '{main_json_filename}' 的根元素不是一个列表，将创建一个新的文件。")
                    existing_records = []
        except json.JSONDecodeError:
            print(f"警告: '{main_json_filename}' 文件格式错误，将创建一个新的文件。")
            existing_records = []

    # 4. Identify new records to add
    existing_datetimes = {record.get('datetime') for record in existing_records}
    new_records_to_add = [
        record for record in current_records if record.get('datetime') not in existing_datetimes
    ]

    # 5. Prepend new records and save back to the main file
    if new_records_to_add:
        # New records are added to the beginning to maintain reverse chronological order
        final_records_list = new_records_to_add + existing_records
        
        with open(main_json_filename, 'w', encoding='utf-8') as f:
            json.dump(final_records_list, f, ensure_ascii=False, indent=2)
        print(f"成功！已向 '{main_json_filename}' 中添加 {len(new_records_to_add)} 条新记录。总记录数: {len(final_records_list)}。")
    else:
        print(f"'{main_json_filename}' 已是最新，无需更新。")

if __name__ == '__main__':
    main() 