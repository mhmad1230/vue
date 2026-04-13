import json
import os

payloads_dir = "payloads"
output_file = "payloads.json"


def generate_payload_index():
    if not os.path.exists(payloads_dir):
        print(f"❌ Folder '{payloads_dir}' not found!")
        return

    payloads = [f for f in os.listdir(payloads_dir) if f.endswith((".bin", ".elf"))]

    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(payloads, f, indent=4)

    print(f"✅ Successfully indexed {len(payloads)} payloads into {output_file}")


if __name__ == "__main__":
    generate_payload_index()
