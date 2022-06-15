import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class Create extends Component {

  constructor() {
    super();
    this.ref = firebase.firestore().collection('students');
    this.state = {
      nama: '',
      alamat: '',
      status: ''
    };
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { nama, alamat, status } = this.state;

    this.ref.add({
      nama,
      alamat,
      status
    }).then((docRef) => {
      this.setState({
        nama: '',
        alamat: '',
        status: ''
      });
      this.props.history.push("/")
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  render() {
    const { nama, alamat, status } = this.state;
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              Add Mahasiswa
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/" class="btn btn-primary"> List Mahasiswa </Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="title">Nama:</label>
                <input type="text" class="form-control" name="nama" value={nama} onChange={this.onChange} placeholder="Nama" />
              </div>
              <div class="form-group">
                <label for="body">Alamat:</label>
                <textArea class="form-control" name="alamat" onChange={this.onChange} placeholder="Alamat" cols="80" rows="3">{alamat}</textArea>
              </div>
              <div class="form-group">
                <label for="author">Status:</label>
                <input type="text" class="form-control" name="status" value={status} onChange={this.onChange} placeholder="Status" />
              </div>
              <button type="submit" class="btn btn-success">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Create;
