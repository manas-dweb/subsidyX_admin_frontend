import styles from "../styles/Home.module.css";
import { CiSearch } from "react-icons/ci";
import {
  CustomButton,
  ExportButton,
  FilterButton,
} from "../components/Common/CustomButton";
import { MdModeEdit } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { getStateManagementLists } from "../redux/Actions/stateManagementAction";
import { DistrictManagementModal } from "../components/Common/Modal";
import {
  districtManagementAction,
  getDistrictManagementLists,
} from "../redux/Actions/districtManagementAction";
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";

function DistrictManagement() {
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);
  const [type, setType] = useState("");
  const [action, setAction] = useState({});

  const actions = [{ icon: MdModeEdit }, { icon: RiDeleteBin5Fill }];
  const districtManagement = useSelector((state) => state?.district);
  const [search, setSearch] = useState('')
  const addNewDistrict = () => {
    setModalShow(true);
    setType("add");
  };

  useEffect(() => {
    dispatch(districtManagementAction?.getDistricts());
  }, [
    districtManagement?.isCreated,
    districtManagement?.isUpdated,
    districtManagement?.isDeleted,
  ]);

  const handleClick = (e, item, idx) => {
    console.log(e, item, idx);
    if (idx === 0) {
      setModalShow(true);
      setType("edit");
      setAction(item);
    } else {
      setModalShow(true);
      setType("delete");
      setAction(item?.id);
    }
  };

  return (
    <div className={styles.container}>
      {modalShow && (
        <DistrictManagementModal
          type={type}
          setType={setType}
          setAction={setAction}
          action={action}
          show={modalShow}
          setModalShow={setModalShow}
          onHide={() => setModalShow(false)}
        />
      )}
      <div className={styles.tablee}>
        <div
          className={`d-flex justify-content-between align-items-center ${styles.tableHeader}`}
        >
          <div className="d-flex justify-content-evenly ">
            <div className={`mx-2 ${styles.search_box}`}>
              <Form.Group className="mb-3" controlId="search">
                <InputGroup>
                  <Button disabled style={{
                    color: "black", background: "white", borderColor: "white", borderTopLeftRadius: "10px",
                    borderBottomLeftRadius: "10px", border: "2px solid rgba(0,0,0,0.2)", borderRight: "none"
                  }}   >
                    {<CiSearch />}
                  </Button>
                  <Form.Control
                    autoComplete="off"
                    style={{
                      padding: "0.5rem",
                      border: "2px solid rgba(0,0,0,0.2)",
                      borderTopRightRadius: "10px",
                      borderBottomRightRadius: "10px",
                      borderTopLeftRadius: "0px",
                      borderBottomLeftRadius: "0px",
                      borderLeft: "none"
                    }}
                    placeholder="Search..."
                    type={'text'}
                    name="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}

                  />
                </InputGroup>
              </Form.Group>
            </div>
          </div>
          <div className="d-flex">
            <div className={styles.add_new_btn}>
              <CustomButton
                name="Add New District"
                bgColor="#4682E3"
                color="#FFFFFF"
                onClick={addNewDistrict}
              />
            </div>

            {/* <ExportButton name="Export List" /> */}
          </div>
        </div>
        <div className={styles.tableBody}>
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">District</th>
                <th scope="col">State</th>
                <th scope="col"></th>
                <th scope="col"> </th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {districtManagement?.districtManagementData?.district?.filter(x => (x?.name?.toLowerCase().includes(search.toLowerCase()))).map(
                (data, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row">{data?.id}</th>
                      <td>{data?.name}</td>
                      <td>{data?.state_name}</td>
                      <td></td>
                      <td></td>
                      <td>
                        <ul className="d-flex justify-content-end">
                          {actions?.map(({ icon: Icon }, idx) => {
                            return (
                              <li
                                key={idx}
                                onClick={(e) => handleClick(e, data, idx)}
                              >
                                <Icon
                                  color="#FA6130"
                                  size="18px"
                                  className="ms-2 action_icon"
                                />
                              </li>
                            );
                          })}
                        </ul>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DistrictManagement;
