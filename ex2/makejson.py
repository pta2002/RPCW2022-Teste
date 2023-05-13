import csv, json, unicodedata


def normalize(string):
    return "".join(
        c
        for c in unicodedata.normalize("NFD", string)
        if unicodedata.category(c) != "Mn"
    ).lower()


with open("pagamentos.csv") as f:
    # Convert to JSON
    reader = csv.DictReader(f)
    # Rename columns
    reader.fieldnames = [normalize(field) for field in reader.fieldnames]
    rows = list(reader)
    for row in rows:
        for k, v in row.items():
            if v == "":
                row[k] = False
            elif v == "1":
                row[k] = True
    # Write JSON
    with open("pagamentos.json", "w") as f:
        f.write(json.dumps(rows, indent=4))

with open("receitas.csv") as f:
    # Convert to JSON
    reader = csv.DictReader(f)
    # Rename columns
    reader.fieldnames = [normalize(field) for field in reader.fieldnames]
    rows = list(reader)
    for row in rows:
        row["valor"] = float(row["valor"])
    # Write JSON
    with open("receitas.json", "w") as f:
        f.write(json.dumps(rows, indent=4))

with open("fracoes.csv") as f:
    # Convert to JSON
    reader = csv.DictReader(f)
    # Rename columns
    reader.fieldnames = [normalize(field) for field in reader.fieldnames]
    rows = list(reader)
    for row in rows:
        row["permilagem"] = float(row["permilagem"])
        row["mensalidade"] = float(row["mensalidade"])
    # Write JSON
    with open("fracoes.json", "w") as f:
        f.write(json.dumps(rows, indent=4))
