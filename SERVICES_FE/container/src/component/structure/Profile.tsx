import React from "react";
import UserService from "../../service/UserService";

export default function Profile() {
  const styles = {
    s1: { backgroundColor: "#f4f5f7" },
    s3: { color: "green" },
    s4: {
      width: 120,
    },
  };

  return (
    <section className="vh-100" style={styles.s1}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-lg-6 mb-4 mb-lg-0">
            <div className="card mb-3 rounded-2 shadow">
              <div className="row g-0">
                <div className="col-md-4 gradient-custom text-center text-black rounded-start">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/new/avatars/1.webp"
                    alt="Avatar"
                    className="img-fluid my-5 rounded-circle shadow-4"
                    style={styles.s4}
                  />
                  <h3>{UserService.getUsername()}</h3>
                </div>
                <div className="col-md-8">
                  <div className="card-body p-4">
                    <h6>Information</h6>
                    <hr className="mt-0 mb-4" />
                    <div className="row pt-1">
                      <div className="col-8 mb-3">
                        <h6>Email</h6>
                        <p className="text-muted">{UserService.getEmail()}</p>
                      </div>
                      <div className="col-6 mb-3">
                        {UserService.getEmailVerified() && (
                          <p>
                            <i
                              className="bi bi-patch-check-fill"
                              style={styles.s3}
                            ></i>
                          </p>
                        )}
                      </div>
                    </div>
                    <hr className="mt-0 mb-4" />
                    <h6>Roles:</h6>
                    <div className="col-8 mb-3">
                      {UserService.roleList().map((r) => (
                        <li key={r}>{r}</li>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
