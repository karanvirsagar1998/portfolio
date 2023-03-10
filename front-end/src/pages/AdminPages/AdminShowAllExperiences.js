import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AdminNav from '../../utils/AdminNavbar'
import Table from 'react-bootstrap/Table';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import experienceService from '../../services/experience-service';
import $ from 'jquery'

function AdminShowAllExperiences() {

    //get data to set fields...
    const [experience, setExperience] = useState([])
    let counter = 0
    const getAllExperiences = () => {
        experienceService.getExperienceData().then((res) => {
            if (res.data.length > 0) {
                setExperience(res.data);
            }
        })
    }
    const [deleteIconClass, setDeleteIconClass] = useState('')
    const deleteExperience = async (id) => {
        $('#deleteProcess' + id).removeClass()
        $('#deleteProcess' + id).addClass('fas fa-spinner fa-pulse')
        await experienceService.deleteExperienceData(id).then((res) => {
            if (res.status == 200) {
                setExperience(experience.filter((ex) => {
                    return ex.id !== id;
                }));
            }
        })
    }
    useEffect(() => {
        getAllExperiences();
    }, [])
    return (
        <>
            <AdminNav></AdminNav>
            <Container>
                <Row>
                    <Col style={{ marginTop: '63px' }}>
                        <h3>Relevant Experience <a href='experience/new' title='Add New'><i className="fa-solid fa-plus"></i></a></h3>
                    </Col>
                    <Table striped bordered hover style={{ background: 'aliceblue' }}>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Job Title</th>
                                <th>Company Name</th>
                                <th>Company Location</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                experience.map(ex =>
                                    <tr key={ex.id}>
                                        <td>{counter += 1}</td>
                                        <td>{ex.jobTitle}</td>
                                        <td>{ex.companyName}</td>
                                        <td>{ex.place}</td>
                                        <td>{ex.startDate}</td>
                                        <td>{ex.endDate}</td>
                                        <td>
                                            <a href={`experience/edit/${ex.id}`} style={{ textDecoration: 'none', color: '#0b77f9', cursor: 'pointer', margin: '0px 5px 0px 5px' }}>
                                                <i className="fa-solid fa-pen-to-square"></i>
                                            </a>
                                            <a onClick={() => deleteExperience(ex.id)} style={{ textDecoration: 'none', color: 'red', cursor: 'pointer', margin: '0px 5px 0px 5px' }}>
                                                <i className='fa-solid fa-trash' id={`deleteProcess${ex.id}`}></i>
                                            </a>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </Table>
                </Row>
            </Container>
        </>
    )
}

export default AdminShowAllExperiences