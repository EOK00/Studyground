import axios from 'axios';

// 과제 get
export const fetchTasks = async (boardId) => {
  const response = await axios.get(`/storage/task/${boardId}`, {
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const responseWithStatus = response.data.map((task) => {
    const current_time = new Date();
    console.log(current_time);
    const dedaline = new Date(task.deadline);
    console.log(dedaline);
    return {
      ...task,
      status: current_time > dedaline ? '종료' : '진행중',
    };
  });
  // deadline 기준으로 정렬
  responseWithStatus.sort((a, b) => {
    const deadlineA = new Date(a.deadline);
    const deadlineB = new Date(b.deadline);
    return deadlineB - deadlineA;
  });
  console.log(responseWithStatus);
  return responseWithStatus;
};

// 과제 추가(방장)
export const addTask = async ({ boardId, formData }) => {
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
  return response.data;
};

// 과제 삭제(방장)
export const deleteTask = async (taskId) => {
  const response = await axios.get(`/storage/deleteTask/${taskId}`, {
    withCredentials: true,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// 제출 과제 get
// export const fetchmTasks = async (boardId) => {
//     const response = await axios.get(`/storage/task/${boardId}`, {
//       withCredentials: true,
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//     const responseWithStatus = response.data.map((task) => {
//       const current_time = new Date();
//       console.log(current_time);
//       const dedaline = new Date(task.deadline);
//       console.log(dedaline);
//       return {
//         ...task,
//         status: current_time > dedaline ? '종료' : '진행중',
//       };
//     });
//     // deadline 기준으로 정렬
//     responseWithStatus.sort((a, b) => {
//       const deadlineA = new Date(a.deadline);
//       const deadlineB = new Date(b.deadline);
//       return deadlineB - deadlineA;
//     });
//     return responseWithStatus;
//   };

// 과제 제출
export const submitTask = async ({ taskId, formData }) => {
  const response = await axios.post(`/storage/submitTask/${taskId}`, formData, {
    withCredentials: true,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};