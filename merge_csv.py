import csv
import os

def read_usernames_from_csv(file_path):
    with open(file_path, newline='', encoding='utf-8') as csvfile:
        reader = csv.reader(csvfile)
        return [row[0] for row in reader]

def merge_and_deduplicate(directory):
    all_usernames = set()  # Use a set to avoid duplicates
    for subdir, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith('.csv'):
                file_path = os.path.join(subdir, file)
                usernames = read_usernames_from_csv(file_path)
                all_usernames.update(usernames)  # Add to set, automatically removing duplicates

    # Write the unique usernames to a new CSV file
    with open('merged_usernames.csv', 'w', newline='', encoding='utf-8') as csvfile:
        writer = csv.writer(csvfile)
        for username in sorted(all_usernames):  # Sorting for easier readability
            writer.writerow([username])

# Replace 'your_directory_path_here' with the path to your "usernames" directory
merge_and_deduplicate('./usernames')
