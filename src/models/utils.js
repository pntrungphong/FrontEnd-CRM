import moment from 'moment';

const emailFormat = (listEmail) => {
  return listEmail.map((element) => ({
    type: element.type,
    url: element.url,
  }));
};

const phoneFormat = (listPhone) => {
  return listPhone.map((item) => ({ number: item.number, type: item.type }));
};

const listCompanyFormat = (listData) => {
  return listData.map((data) => ({
    key: data.id.toString(),
    label: data.name,
    value: data.id.toString(),
  }));
};

const listReferralFormat = (listData) => {
  return listData.map((data) => ({
    key: data.idTarget.toString(),
    value: data.idTarget.toString(),
    label: data.name,
  }));
};

const listTagFormat = (listData) => {
  return listData.map((data) => ({
    key: data.id.toString(),
    label: data.tag,
    value: data.id.toString(),
  }));
};

const listTaskFormat = (listData) => {
  return listData.map((task) => ({
    id: task.id,
    taskname: task.taskName,
    type: task.type,
    userId: task.userId,
    dueDate: task.dueDate,
  }));
};

const listFileFormatDetail = (brief, listTP) => {
  const listFileBrief = brief.map((it) => ({
    id: it.id,
    mimetype: it.mimetype,
    originalname: it.originalname,
    createdAt: it.createdAt,
    createdBy: it.createdBy,
    url: it.url ?? '',
    type: it.type ?? 'brief',
    order: it.type ?? 0,
    note: it.note ?? '',
  }));
  const listTPID = {};
  listTP.forEach((item) => {
    listTPID[item.id] = item.order;
  });
  const filesTouchPoint = listTP.length ? listTP[0].fileTouchPoint : [];
  const listFileTouchPoint = filesTouchPoint.map((it) => {
    return {
      id: it.file.id,
      mimetype: it.file.mimetype,
      originalname: it.file.originalname,
      createdAt: it.file.createdAt,
      createdBy: it.file.createdBy,
      url: it.file.url ?? '',
      type: it.type ?? 'brief',
      order: listTPID[it.touchPointId] ?? 0,
      note: it.note ?? '',
    };
  });

  return [...listFileBrief, ...listFileTouchPoint];
};

export const getDefaultPagination = () => {
  return {
    page_size: 0,
    total_pages: 0,
    current_page: 0,
    next_page: 0,
    prev_page: 0,
  };
};
export const setPagination = (data) => {
  try {
    return {
      page_size: data.page_size,
      total_pages: data.total_pages,
      current_page: data.current_page,
      next_page: data.next_page,
      prev_page: data.prev_page,
    };
  } catch (error) {
    throw new Error('Missing pagination data');
  }
};
export const formatListLeadData = (response) => {
  try {
    const touchPointLength = response.data.map((element) => {
      return element.touchPoint.length;
    });
    const touchPointList = [];
    for (let i = 0; i < Math.max(...touchPointLength); i += 1) {
      touchPointList.push(i);
    }
    const formattedData = [];
    response.data.forEach((element) => {
      const touchPoints = element.touchPoint
        ? element.touchPoint.map((touchPoint) => {
            const tasks = touchPoint.task.map((task) => {
              return {
                id: task.id,
                touchpointId: touchPoint.id,
                taskname: task.taskName,
                type: task.type,
                userId: task.userId,
                avatar: task.user.avatar,
                dueDate: task.dueDate,
                userName: task.user.firstName,
              };
            });
            return {
              status: touchPoint.status,
              order: touchPoint.order,
              review: touchPoint.review ? touchPoint.review : '',
              note: touchPoint.note ? touchPoint.note : '',
              id: touchPoint.id,
              goal: touchPoint.goal ? touchPoint.goal : '',
              meetingDate: touchPoint.meetingDate ? touchPoint.meetingDate : '',
              createdAt: touchPoint.createdAt,
              actualDate: touchPoint.actualDate,
              task: tasks,
            };
          })
        : [];
      const data = {
        name: element.name,
        touchPoint: touchPoints,
        rank: element.rank,
        status: element.status,
        description: element.description,
        id: element.id,
        company: element.company,
        contact: element.contact,
      };

      formattedData.push(data);
    });

    const returnData = {
      data: formattedData,
      itemCount: response.meta.itemCount,
      currentPage: response.meta.page,
      touchPointList,
    };
    return returnData;
  } catch (error) {
    throw new Error(error);
  }
};
export const formatDetailContactData = (response) => {
  try {
    const company = listCompanyFormat(response.company ?? []);
    const tag = listTagFormat(response.tag ?? []);
    const referral = listReferralFormat(response.referral ?? []);
    const website = emailFormat(response.website ?? []);
    const email = emailFormat(response.email ?? []);
    const address = response.address ?? [];
    const phone = phoneFormat(response.phone ?? []);

    const returnData = {
      referral,
      company,
      email,
      website,
      address,
      tag,
      phone,
      title: response.title ?? '',
      name: response.name,
      id: response.id,
    };

    return returnData;
  } catch (error) {
    throw new Error('Missing data');
  }
};
export const formatDetailCompanyData = (response) => {
  try {
    const contact = response.contact
      ? response.contact.map((element) => {
          return {
            key: element.id.toString(),
            value: element.id.toString(),
            label: element.name,
          };
        })
      : [];

    const tag = response.tag
      ? response.tag.map((element) => {
          return {
            key: element.id.toString(),
            value: element.id.toString(),
            label: element.tag,
          };
        })
      : [];

    const website = response.website
      ? response.website.map((element) => {
          return {
            type: element.type,
            url: element.url,
          };
        })
      : [];

    const email = response.email
      ? response.email.map((element) => {
          return {
            type: element.type,
            url: element.url,
          };
        })
      : [];

    const address = response.address
      ? response.address.map((element) => {
          return element;
        })
      : [];

    const phone = response.phone
      ? response.phone.map((element) => {
          return {
            number: element.number,
          };
        })
      : [];

    const returnData = {
      contact,
      url: response.url ? response.url : '',
      email,
      website,
      tag,
      address,
      phone,
      name: response.name,
      id: response.id,
    };

    return returnData;
  } catch (error) {
    throw new Error('Missing data');
  }
};

export const formatListContactData = (response) => {
  try {
    const formattedData = response.data.map((element) => {
      const company = listCompanyFormat(element.company ?? []);
      const email = emailFormat(element.email ?? []);
      const phone = phoneFormat(element.phone ?? []);
      return {
        company,
        email,
        phone,
        title: element.title ? element.title : '',
        name: element.name,
        id: element.id,
      };
    });
    const returnData = {
      list: formattedData,
      itemCount: response.meta.itemCount,
      currentPage: response.meta.page,
    };
    return returnData;
  } catch (error) {
    throw new Error('Missing data');
  }
};
export const formatListCompanyData = (response) => {
  try {
    const formattedData = response.data.map((element) => {
      const contact = listCompanyFormat(element.contact ?? []);
      const email = emailFormat(element.email ?? []);
      const phone = phoneFormat(element.phone ?? []);

      return {
        contact,
        email,
        phone,
        name: element.name,
        id: element.id,
      };
    });
    const returnData = {
      data: formattedData,
      itemCount: response.meta.itemCount,
      currentPage: response.meta.page,
    };
    return returnData;
  } catch (error) {
    throw new Error('Missing data');
  }
};

export const formatDetailTouchPointData = (response, fileResponse) => {
  try {
    const sla = [];
    const scope = [];
    const estimation = [];
    const pricing = [];
    const quotation = [];
    const proposal = [];

    fileResponse.forEach((file) => {
      const newData = {
        id: file.fileId,
        originalname: file.file.originalname,
        note: file.note,
        createdBy: file.file.createdBy,
        createdAt: moment(file.file.createdAt).format('DD-MM-YYYY'),
        order: file.touchPoint.order,
        touchPointId: file.touchPointId,
        fileType: file.file.mimetype,
        fileUrl: file.file.url ?? '',
      };
      switch (file.type) {
        case 'sla':
          sla.push(newData);
          break;
        case 'scope':
          scope.push(newData);
          break;
        case 'estimation':
          estimation.push(newData);
          break;
        case 'pricing':
          pricing.push(newData);
          break;
        case 'quotation':
          quotation.push(newData);
          break;
        case 'proposal':
          proposal.push(newData);
          break;
        default:
          break;
      }
    });

    const tasks = listTaskFormat(response.task ?? []);

    const returnData = {
      goal: response.goal,
      note: response.note ? response.note : '',
      review: response.review ? response.review : '',
      order: response.order ? response.order : '',
      meetingdate: response.meetingDate ? moment(response.meetingDate) : moment(),
      sla,
      task: tasks,
      estimation,
      pricing,
      quotation,
      proposal,
      scope,
    };

    return returnData;
  } catch (error) {
    throw new Error('Missing pagination data');
  }
};

export const formatDetailLeadData = (response) => {
  try {
    const contact = listCompanyFormat(response.contact ?? []);
    const relation = listCompanyFormat(response.relatedTo ?? []);
    const tag = listTagFormat(response.tag ?? []);
    const company = {
      key: response.company.id,
      label: response.company.name,
    };
    const listFile = listFileFormatDetail(response.file ?? [], response.touchPoint ?? []);
    return {
      listFile,
      company,
      touchPoint: response.touchPoint,
      description: response.description,
      rank: response.rank,
      id: response.id,
      name: response.name,
      status: response.status,
      tag,
      contact,
      relation,
      note: response.note.length > 0 ? response.note[0].content : '',
      file: response.file,
    };
  } catch (error) {
    throw new Error('Missing pagination data');
  }
};
