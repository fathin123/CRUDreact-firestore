import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import firebase from './Firebase';

class App extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('students');
    this.unsubscribe = null;
    this.state = {
      students: []
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const students = [];
    querySnapshot.forEach((doc) => {
      const { nama, alamat, status } = doc.data();
      students.push({
        key: doc.id,
        doc, // DocumentSnapshot
        nama,
        alamat,
        status,
      });
    });
    this.setState({
      students
   });
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              LIST MAHASISWA
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/create" class="btn btn-primary">Add Mahasiswa</Link></h4>
            <table class="table table-stripe">
              <thead>
                <tr>
                  <th>Nama</th>
                  <th>Alamat</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {this.state.students.map(student =>
                  <tr>
                    <td><Link to={`/show/${student.key}`}>{student.nama}</Link></td>
                    <td>{student.alamat}</td>
                    <td>{student.status}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
