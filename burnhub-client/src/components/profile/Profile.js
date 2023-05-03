import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const Profile = () => {
    const [profile, setProfile] = useState ({
        name: "",
        email: "",
        image: "",
    });
     const { userId } = useParams();
     const navigate = useNavigate();

      useEffect( () => {
      fetch(`https://localhost:7069/Users/${userId}`)
        .then((response) => response.json())
        .then((data) => {
            setProfile(data);
        });
      }, []);

      const handleSaveButtonClick = (e) => {
        e.preventDefault();

        return fetch(`https://localhost:7069/Users/${profile.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(profile),
        })
            .then((response) => response.json())
            .then(() => {
                navigate("/");
            });
      };

      return (
        <div>
        <form>
            <fieldset>
                <div>
                    <section>
                        <label>Photo</label>
                        <input
                          required
                          autoFocus
                          type="string"
                          value={profile.image}
                          onChange={(evt) => {
                            const copy = { ...profile };
                            copy.image = evt.target.value;
                            setProfile(copy)
                          }}
                          />
                    </section>
                </div>
            </fieldset>
            <fieldset>
                <div>
                    <section>
                        <label>Name</label>
                        <input
                          required
                          autoFocus
                          type="string"
                          value={profile.name}
                          onChange={(evt) => {
                            const copy = { ...profile };
                            copy.name = evt.target.value;
                            setProfile(copy)
                          }}
                          />
                    </section>
                </div>
            </fieldset>
            <fieldset>
                <div>
                    <section>
                        <label>Email</label>
                        <input
                          required
                          autoFocus
                          type="string"
                          value={profile.email}
                          onChange={(evt) => {
                            const copy = { ...profile };
                            copy.email = evt.target.value;
                            setProfile(copy)
                          }}
                          />
                    </section>
                </div>
            </fieldset>
            <div>
                <button onClick={(clickEvent) => {handleSaveButtonClick(clickEvent)}}>Edit Profile</button>
            </div>
        </form>
        </div>
      )






    
}