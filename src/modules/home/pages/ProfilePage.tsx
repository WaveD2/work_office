import React from 'react';

const ProfilePage = () => {
  return (
    <div style={{ maxWidth: '550px', margin: '0px auto' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          margin: '18px 0px',
          borderBottom: '1px solid grey',
        }}
      >
        <div>
          <img
            style={{ width: '160px', height: '160px', borderRadius: '80px', objectFit: 'cover' }}
            src="https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg"
          />
        </div>
        <div>
          <h4>Tien Pham</h4>
          <h5>ansd341@yopmail.com</h5>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '108%' }}>
            <h6>20 posts</h6>
            <h6>1000 followers</h6>
            <h6>1 following</h6>
          </div>
          <button
            style={{
              margin: '10px',
            }}
            className="btn waves-effect waves-light #64b5f6 blue darken-1"
            onClick={() => {}}
          >
            Follow
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
