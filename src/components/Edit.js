import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class Edit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      key: '',
      nama: '',
      alamat: '',
      status: ''
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('students').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        const student = doc.data();
        this.setState({
          key: doc.id,
          nama: student.nama,
          alamat: student.alamat,
          status: student.status
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState({student:state});
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { nama, alamat, status } = this.state;

    const updateRef = firebase.firestore().collection('students').doc(this.state.key);
    updateRef.set({
      nama,
      alamat,
      status
    }).then((docRef) => {
      this.setState({
        key: '',
        nama: '',
        alamat: '',
        status: ''
      });
      this.props.history.push("/show/"+this.props.match.params.id)
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              Edit Mahasiswa
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to={`/show/${this.state.key}`} class="btn btn-primary">List Mahasiswa</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="title">Nama:</label>
                <input type="text" class="form-control" name="nama" value={this.state.nama} onChange={this.onChange} placeholder="Nama" />
              </div>
              <div class="form-group">
                <label for="body">Alamat:</label>
                <input type="text" class="form-control" name="alamat" value={this.state.alamat} onChange={this.onChange} placeholder="Alamat" />
              </div>
              <div class="form-group">
                <label for="author">Status:</label>
                <input type="text" class="form-control" name="status" value={this.state.status} onChange={this.onChange} placeholder="Status" />
              </div>
              <button type="submit" class="btn btn-success">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Edit;
