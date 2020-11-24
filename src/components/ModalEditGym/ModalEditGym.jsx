import React, { useState } from "react";
import { useFormState } from "../../hooks/useFormState";
import InputWithLabel from "../Form/InputWithLabel/InputWithLabel";
import Button from "../Button/Button";
import CheckBoxWithLabel from "../Form/CheckBoxWithLabel/CheckBoxWithLabel";

export default function ModalEditGym({ onClick, user }) {
  const { state, onBlur, onChange } = useFormState(
    {
      data: {
        id: user.id,
        name: user.user.name,
        role: user.user.role,
        services: user.services,
        packages: user.user.packages,
        phone: user.user.phone,
        address: user.user.address,
        city: user.user.city,
        zipcode: user.user.zipcode,
      },
      error: {
        name: true,
        phone: true,
        address: true,
        city: true,
        zipcode: true,
      },
      touch: {},
    },
    {
      name: (v) => v.length,
      role: (v) => v.length,
      services: (v) => v.length,
      phone: (v) => v.length,
      address: (v) => v.length,
      city: (v) => v.length,
      zipcode: (v) => v.length,
    }
  );

  const { data, error, touch } = state;

  const [edit, setEdit] = useState(false);
  const [registerError, setRegisterError] = useState(null);
  const [profileInfo, setProfileInfo] = useState(true);
  const [profileData, setProfileData] = useState(data);
  const [servicesList, setServicesList] = useState([]);
  const [message, setMessage] = useState("");

  const updateProfile = () => {
    console.log("whatever");
  };

  const getServicesItems = (e) => {
    let newArray = [...data.services, e.target.id];
    if (data.services.includes(e.target.id)) {
      newArray = newArray.filter((el) => el !== e.target.id);
    }
    data.services = newArray;
  };

  return (
    <div className="modal">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-sm-6 col-12 modal-body">
            <span className="close" onClick={onClick}></span>
            <div className="row edit-profile">
              <form className="col-12" onSubmit={updateProfile}>
                <div className="row">
                  <div className="col-12 profile-info">
                    <div className="row content-block">
                      <div className="col-12">
                        <InputWithLabel
                          value={data.name}
                          onBlur={onBlur}
                          onChange={onChange}
                          name="name"
                          type="text"
                          className="form-control"
                          placeholder={data.name}
                        />
                      </div>
                    </div>
                    <div className="row content-block">
                      <div className="col-12">
                        <InputWithLabel
                          value={data.phone}
                          onBlur={onBlur}
                          onChange={onChange}
                          name="phone"
                          type="text"
                          className="form-control"
                          placeholder={
                            data.phone ? data.phone : "Insert your phone"
                          }
                        />
                      </div>
                    </div>
                    <div className="row content-block d-flex align-items-start">
                      <div className="col-12">
                        <InputWithLabel
                          value={data.address}
                          onBlur={onBlur}
                          onChange={onChange}
                          name="address"
                          type="text"
                          className="form-control"
                          placeholder={
                            data.address ? data.address : "Insert your address"
                          }
                        />
                        <InputWithLabel
                          value={data.city}
                          onBlur={onBlur}
                          onChange={onChange}
                          name="city"
                          type="text"
                          className="form-control"
                          placeholder={
                            data.city ? data.city : "Insert your city"
                          }
                        />
                        <InputWithLabel
                          value={data.zipcode}
                          onBlur={onBlur}
                          onChange={onChange}
                          name="zipcode"
                          type="text"
                          className="form-control"
                          placeholder={
                            data.zipcode ? data.zipcode : "Insert your zipcode"
                          }
                        />
                      </div>

                      {registerError && (
                        <div className="alert alert-danger">
                          {registerError}
                        </div>
                      )}
                      <div className="col-12 col-sm-6">
                        <Button className="button __yellow-btn">
                          Edit Profile
                        </Button>
                      </div>
                      <div className="col-12 col-sm-6">
                        <Button className="button __yellow-btn">Cancel</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
