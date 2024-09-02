import axios from 'axios';
import { Button } from '../../../Component/Button';
import './NoticeDetail.css';
import {
  Link,
  useLocation,
  useNavigate,
  useOutletContext,
  useParams,
} from 'react-router-dom';
import { FormatFullDate } from '../../../Component/FormattedDate';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNotice } from '../../../api/noticeApi';

const NoticeDetail = () => {
  const { userId, leaderId } = useOutletContext();
  const queryClient = useQueryClient();
  const host = 'http://localhost:5000';
  const location = useLocation();
  const navigate = useNavigate();
  const { notice } = location.state || {};
  const { boardId, fetchNoticesRef } = useOutletContext();
  const { noticeId } = useParams();
  console.log(userId);
  console.log(leaderId);
  // 공지사항 삭제
  const deleteNoticeMutation = useMutation({
    mutationFn: () => deleteNotice({ noticeId }),
    onSuccess: () => {
      alert('공지사항이 성공적으로 삭제되었습니다.');
      queryClient.invalidateQueries(['notices', boardId]);
      navigate(`/work/${boardId}/notice`);
    },
    onError: (error) => {
      console.error('공지사항 삭제 중 오류 발생 : ', error);
      alert('공지사항 삭제 중 오류가 발생하였습니다.');
    },
  });
  // 삭제 확인
  const handleDelete = () => {
    const confirmDelete = window.confirm('정말 삭제하시겠습니까 ?');
    if (confirmDelete) {
      deleteNoticeMutation.mutate();
    }
  };

  return (
    <div className="detail-container">
      <div className="detail-field">
        <div className="detail-field-title">제목</div>
        <div className="divider-column"></div>
        <div className="detail-field-content">{notice.title}</div>
      </div>
      <div className="detail-field">
        <div className="detail-field-title">게시일</div>
        <div className="divider-column"></div>
        <div className="detail-field-content">
          <FormatFullDate dateString={notice.updatedAt} />
        </div>
      </div>
      <div className="divider-row"></div>
      <div className="detail-contentType">{notice.content}</div>
      <div className="attachmentType">첨부파일 ({notice.files.length}개)</div>
      {notice.files.map((file, fileKey) => (
        <div className="attachment-box">
          <a
            href={`${host}/files/${file.fileName}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {file.fileName}
          </a>
        </div>
      ))}
      <div className="divider-row"></div>
      <div className="buttonsArea">
        {leaderId === userId ? (
          <>
            <Button
              name="수정"
              color="#3D9BF3"
              onClick={() =>
                navigate(`../${noticeId}/update`, { state: { notice } })
              }
              hoverColor="#5AA7F6"
            />
            <Button
              name="삭제"
              color="#E86161"
              onClick={handleDelete}
              hoverColor="#D2625D"
            />
          </>
        ) : (
          <></>
        )}
        <Button
          name="목록"
          color="#D9D9D9"
          onClick={() => navigate('../')}
          hoverColor="#E0E0E0"
        />
      </div>
    </div>
  );
};
export default NoticeDetail;
