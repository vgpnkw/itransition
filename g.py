import sys
from faker import Faker
import io
import csv

faker = Faker(sys.argv[2])

for i in range(int(sys.argv[1])):
    out = io.StringIO()
    csv_data = [faker.name(), faker.address(), faker.phone_number()]
    csv.writer(out, lineterminator = "\n").writerow(csv_data)
    print(out.getvalue().replace("\n", " "))