import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';


function ModalPage(props){

	return(
		<Modal show={props.modalShow} onHide={()=>props.setModalShow(true)} size="lg" centered>
			<Modal.Header>
				<Modal.Title>Data Karyawan</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form.Control value={props.dataTable.inputNama}  onChange={(e)=> props.handleInput('inputNama', e)}  type="text" placeholder="Masukkan Nama" />
				<Form.Control value={props.dataTable.inputJabatan} onChange={(e)=> props.handleInput('inputJabatan', e)} style={{marginTop: '10px', marginBottom: '10px'}} type="text" placeholder="Masukkan Jabatan" />
				<Form.Control value={props.dataTable.inputJk}  onChange={(e)=> props.handleInput('inputJk', e)} as="select" defaultValue="Pilih...">
					<option value= "">Pilih Jenis Kelamin</option>
					<option value= "Laki-Laki">Laki-Laki</option>
        			<option value= "Perempuan">Perempuan</option>
				 </Form.Control>
				<Form.Control value={props.dataTable.inputTl}  onChange={(e)=> props.handleInput('inputTl', e)} style={{marginTop: '10px'}} type="date" />
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={()=>props.closeModal()} >Close</Button>
				<Button variant="success" onClick={()=>props.simpanData()} >Simpan</Button>
			</Modal.Footer>
		</Modal>

	)
}

export default ModalPage;