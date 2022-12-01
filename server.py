import firebase_admin
from flask import Flask, request, jsonify, render_template
from firebase_admin import firestore, credentials
from datetime import datetime

# Application Default credentials are automatically created.
cred = credentials.Certificate('key.json')

app = firebase_admin.initialize_app(cred)
db = firestore.client()

app = Flask(__name__)

def readall():
   docs = db.collection('tasks').get()
   data = ([(doc.id, doc.to_dict()) for doc in docs])
   for entry in data:
       date = entry[1]['date'].split('-')
       if past(date[2], date[1], date[0]):
           db.collection('tasks').document(entry[0]).delete()
           data.remove(entry)
   return data


#homepage listing all current tasks
@app.route('/')
def index():
    return render_template('list.html', data=readall())

#add task
@app.route('/add', methods=["POST"])
def create():
    doc_ref = db.collection('tasks').document()
    data = request.get_json()
    doc_ref.set(data)
    return render_template("list.html", data=readall())


#update task
@app.route('/update', methods=['POST'])
def update():
    json = request.get_json()
    data = {'name': json['name'], 'task': json['task'], 'priority': json['priority']}
    db.collection('tasks').document(json['ref_num']).update(data)
    return render_template("list.html", data=readall())

#render edit page
@app.route('/edit/<id>')
def edit(id=id):
    if id != 'new':
        doc_ref = db.collection('tasks').document(id)
        doc = doc_ref.get().to_dict()
        data = {
            'name': doc['name'],
            'task': doc['task'],
            'date': doc['date'],
            'priority': doc['priority'],
            'ref': id
        }
    else:
        data = {
            'name': '',
            'task': '',
            'date': '',
            'priority': 'false',
            'ref': ''
        }
    return render_template('edit.html', name=data['name'], task=data['task'], ref=data['ref'], date=data['date'], priority=data['priority'])


#delete task
@app.route('/delete', methods=['DELETE'])
def delete():
    ref = request.get_json()
    db.collection('tasks').document(ref['ref_num']).delete()
    return render_template('list.html', data=readall())


def past(day, month, year):
    today = datetime.now()
    if int(year) < today.year:
        return True
    elif int(month) < today.month and int(year) == today.year:
        return True
    elif int(day) < today.day and int(month) == today.month:
        return True
    return False


if __name__ == '__main__':
    app.run(debug=True, port=5000)