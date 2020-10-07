import React, {Component} from 'react';
import { Container, Row, Col, Alert, Table, Button } from 'react-bootstrap';
import ModalPage from './PageModal';

class Body extends Component {
	constructor(props){
		super(props);
		this.state={
			dataTable: [],
			inputNama: '',
			inputJabatan: '',
			inputJk: '',
			inputTl: '',
			inputId: ''
		}

		this.panggilSemua=this.panggilSemua.bind(this);
		this.hapusData=this.hapusData.bind(this);
		this.closeModal=this.closeModal.bind(this);
		this.handleInput=this.handleInput.bind(this);
		this.clearInput=this.clearInput.bind(this);
		this.simpanData=this.simpanData.bind(this);
		this.panggilById=this.panggilById.bind(this);
	}

	panggilById(id){
		fetch(`http://localhost:3000/data-karyawan/${id}`)
  			.then((response) => response.json())
  			.then((hasil => {
	  				this.props.setModalShow(true)
	  				this.setState(
		  				{
		  					inputNama: hasil.nama_karyawan,
							inputJabatan: hasil.jabatan,
							inputJk: hasil.jenis_kelamin,
							inputTl: hasil.tanggal_lahir,
							inputId: hasil.id
		  				}
		  			)
	  			}
  			))
	}

	simpanData(){
		if(this.state.inputNama === "" || this.state.inputJabatan === "" || this.state.inputJk === "" || this.state.inputTl === ""){
			alert("Silahkan isi data terlebih dahulu")
		} else if(this.state.inputId === ""){
			fetch('http://localhost:3000/data-karyawan',{
				method: 'POST',
				body: JSON.stringify({
					nama_karyawan: this.state.inputNama,
					jabatan: this.state.inputJabatan,
					jenis_kelamin: this.state.inputJk,
					tanggal_lahir: this.state.inputTl
				}),
				headers:{
					'Content-type': 'application/json; charset=UTF-8',
				},
			}).then((response) =>response.json())
			  .then((result =>{
				alert("Data Karyawan Telah Disimpan")
				this.closeModal()
				this.panggilSemua()
			}))
		}else{
				fetch(`http://localhost:3000/data-karyawan/${this.state.inputId}`,{
					method: 'PUT',
					body: JSON.stringify({
						nama_karyawan: this.state.inputNama,
						jabatan: this.state.inputJabatan,
						jenis_kelamin: this.state.inputJk,
						tanggal_lahir: this.state.inputTl
					}),
					headers:{
						'Content-type': 'application/json; charset=UTF-8',
					},
				}).then((response) =>response.json())
			  		.then((result =>{
			  		alert("Data Karyawan Telah Diperbaharui")
					this.panggilSemua()
					this.closeModal()					
			}))
		}
	}

	handleInput(value, e){
		this.setState({[value]: e.target.value})
	}


	closeModal(){
		this.props.setModalShow(false)
		this.clearInput()
	}

	clearInput(){
		this.setState({
			inputNama: '',
			inputJabatan: '',
			inputJk: '',
			inputTl: '',
			inputId: ''
		})
	}

	hapusData(id){
		fetch(`http://localhost:3000/data-karyawan/${id}`, {
			method: 'DELETE'
		}).then((response => {
			alert('Data Karyawan Sudah Terhapus')
			this.panggilSemua()
		}))
	}

	panggilSemua(){
		fetch('http://localhost:3000/data-karyawan')
		.then((response)=> response.json())
		.then((hasil)=> this.setState({dataTable: hasil}))
	}

	componentDidMount(){
		this.panggilSemua()
	}

	render(){
		return(
			<>
				<Row>
					<Col align="center"><Alert variant= "success">DATA KARYAWAN</Alert></Col>
				</Row>
				<Row>
					<Col sm={9}></Col>
					<Col align="center" sm={3}><Button onClick={()=> this.props.setModalShow(true)} variant="primary" size="sm">Tambah</Button></Col>
				</Row><br />
				<Container>
					<ModalPage 
					modalShow={this.props.modalShow}
					setModalShow={this.props.setModalShow} 
					closeModal={this.closeModal}
					handleInput={this.handleInput}
					dataTable={this.state}
					simpanData={this.simpanData}
					/>
					<Row>
							<Col>
								<Table striped bordered hover responsive style={{textAlign: "center"}}>
									  <thead>
									    <tr>
									      <th>Id</th>
									      <th>Nama Karyawan</th>
									      <th>Jabatan</th>
									      <th>Jenis Kelamin</th>
									      <th>Tanggal Lahir</th>
									      <th>Aksi</th>
									    </tr>
									  </thead>
									  <tbody>
									  {
									  	this.state.dataTable.reverse().map((value, index)=>{
									  		return(
											    <tr key={index}>
											      <td>{value.id}</td>
											      <td>{value.nama_karyawan}</td>
											      <td>{value.jabatan}</td>
											      <td>{value.jenis_kelamin}</td>
											      <td>{value.tanggal_lahir}</td>
											      <td>
													  <Button onClick={()=> this.panggilById(value.id)} variant="success" size="sm">Edit</Button>
													  <Button onClick={()=> this.hapusData(value.id)} variant="danger" size="sm">Hapus</Button>
											      </td>
											    </tr>
											)    
										})
									}
									  </tbody>
								</Table>
							</Col>
				    </Row>
			    </Container>
			</>
		)
	}
}

export default Body;