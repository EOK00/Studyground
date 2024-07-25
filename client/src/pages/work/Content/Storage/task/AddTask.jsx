import React, { useEffect, useState } from 'react';
import './AddTask.css';
import axios from 'axios';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { Button } from '../../../Component/Button';

const AddNotice = () => {
  const { boardId } = useOutletContext();
  const navigate = useNavigate();

  // 과제 추가 State
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [deadline, setDeadline] = useState('');
  const [files, setFiles] = useState([]);

  const handleFileChange = (event) => {
    setFiles([...files, ...event.target.files]);
  };

  // 과제 추가
  const handleAddTask = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('deadline', deadline);
    files.forEach((file) => {
      formData.append('files', file);
    });
    console.log(formData);
    try {
      const response = await axios.post(
        `/storage/enrollTask/${boardId}`,
        formData,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      if (response.data.success) {
        alert('과제가 성공적으로 추가되었습니다.');

        navigate(`/work/${boardId}/task`);
      } else {
        alert('과제 추가에 실패했습니다.');
      }
    } catch (error) {
      console.error('과제 추가 중 오류 발생:', error);
      alert('과제 추가 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="detail-container">
      <form onSubmit={handleAddTask}>
        <div className="detail-field">
          <div className="detail-field-title">제목</div>
          <div className="divider-column"></div>
          <input
            type="text"
            className="inputType"
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력해 주세요"
          />
        </div>
        <div className="detail-field">
          <div className="detail-field-title">마감일</div>
          <div className="divider-column"></div>
          <input
            type="datetime-local"
            className="inputType"
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력해 주세요"
          />
          <div className="checkboxArea">
            지각제출 허용
            <input
              type="checkbox"
              id="checkbox"
              // checked={isImportant}
              // onChange={(e) => setIsImportant(e.target.checked)}
            />
          </div>
        </div>
        <div className="detail-field">
          <textarea
            style={{ width: '100%', height: '400px' }}
            onChange={(e) => setContent(e.target.value)}
            placeholder="내용을 입력해 주세요"
          />
        </div>
        <div className="divider-row"></div>
        <div className="attachArea">
          <div className="attachArea-row">
            <div className="attachArea-title">첨부파일</div>
            <div className="divider-column"></div>
            <input
              type="file"
              id="files"
              multiple
              onChange={handleFileChange}
            />
          </div>
          <div className="attachArea-row">
            <div className="attachArea-title">첨부파일</div>
            <div className="divider-column"></div>
            <input
              type="file"
              id="files"
              multiple
              onChange={handleFileChange}
            />
          </div>
          <div className="attachArea-row">
            <div className="attachArea-title">첨부파일</div>
            <div className="divider-column"></div>
            <input
              type="file"
              id="files"
              multiple
              onChange={handleFileChange}
            />
          </div>
          <div className="divider-row"></div>
          <div className="enroll-button">
            <Button
              type="submit"
              name="등록하기"
              color="#E86161"
              hoverColor="#CC514A "
            />
          </div>
        </div>
      </form>
    </div>
    // <div className="task-detail-container">
    //   <form onSubmit={handleAddNotice}>
    //     <div className="task-detail-header">
    //       <hr />

    //       <div className="task-detail-box">
    //         <div className="task-detail-field">제목</div>
    //         <div className="input-field">
    //           <input
    //             type="text"
    //             id="title"
    //             value={title}
    //             onChange={(e) => setTitle(e.target.value)}
    //           />
    //         </div>
    //       </div>
    //       <hr />
    //       <div className="task-detail-box">
    //         <div className="task-detail-field">작성자</div>
    //       </div>
    //       <hr />
    //       <div className="task-detail-box">
    //         <div className="task-detail-field">게시일</div>
    //         <div className="input-field">
    //           <input />
    //         </div>
    //       </div>
    //       <hr />
    //     </div>
    //     <div className="task-submit-textarea">
    //       <textarea
    //         id="content"
    //         value={content}
    //         onChange={(e) => setContent(e.target.value)}
    //         placeholder="내용을 입력해 주세요"
    //       />
    //     </div>
    //     <hr id="divider" />
    //     <div className="attachments-container">
    //       <div>
    //         첨부파일1:
    //         <input
    //           type="file"
    //           id="files"
    //           multiple
    //           onChange={handleFileChange}
    //         />
    //       </div>
    //       <div>
    //         첨부파일2:
    //         <input
    //           type="file"
    //           id="files"
    //           multiple
    //           onChange={handleFileChange}
    //         />
    //       </div>
    //       <div>
    //         첨부파일3:
    //         <input
    //           type="file"
    //           id="files"
    //           multiple
    //           onChange={handleFileChange}
    //         />
    //       </div>
    //     </div>
    //     <hr />
    //     <div className="enroll-button">
    //       <Button type="submit" name="등록하기" color="#E86161" />
    //     </div>
    //   </form>
    // </div>
  );
};
export default AddNotice;