import moment from 'moment';

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
export const formatedListLeadData = (response) => {
  try {
    const touchPointLength = response.data.map((element) => {
      return element.touchpoint.length;
    });
    const touchpointList = [];
    for (let i = 0; i < Math.max(...touchPointLength); i += 1) {
      touchpointList.push(i);
    }
    const formatedData = [];
    response.data.forEach((element) => {
      const touchPoint = element.touchpoint
        ? element.touchpoint.map((touchpoint) => {
            const tasks = touchpoint.task.map((task) => {
              return {
                id: task.id,
                touchpointId: touchpoint.id,
                taskname: task.taskname,
                type: task.type,
                userId: task.userId,
                dueDate: task.dueDate,
                userName: task.user.firstName,
              };
            });
            return {
              status: touchpoint.status,
              order: touchpoint.order,
              review: touchpoint.review ? touchpoint.review : '',
              note: touchpoint.note ? touchpoint.note : '',
              id: touchpoint.id,
              goal: touchpoint.goal ? touchpoint.goal : '',
              meetingDate: touchpoint.meetingDate ? touchpoint.meetingDate : '',
              task: tasks,
            };
          })
        : [];
      const data = {
        name: element.name,
        touchPoint,
        rank: element.rank,
        status: element.status,
        description: element.description,
        id: element.id,
        company: element.company,
      };
      formatedData.push(data);
    });

    const returnData = {
      data: formatedData,
      itemCount: response.meta.itemCount,
      currentPage: response.meta.page,
      touchpointList,
    };
    return returnData;
  } catch (error) {
    throw new Error(error);
  }
};

export const formatedDetailContactData = (response) => {
  try {
    const company = response.company
      ? response.company.map((element) => {
          return {
            key: element.id.toString(),
            label: element.name,
            value: element.id.toString(),
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

    const referral = response.referral
      ? response.referral.map((element) => {
          return {
            key: element.idTarget.toString(),
            value: element.idTarget.toString(),
            label: element.name,
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
            type: element.type,
            number: element.number,
          };
        })
      : [];

    const returnData = {
      referral,
      company,
      title: response.title != null ? response.title : '',
      email,
      website,
      address,
      tag,
      phone,
      name: response.name,
      id: response.id,
    };

    return returnData;
  } catch (error) {
    throw new Error('Missing data');
  }
};

export const formatedDetailCompanyData = (response) => {
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
            type: element.type,
            number: element.number,
          };
        })
      : [];

    const returnData = {
      contact,
      url: response.url != null ? response.url : '',
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

export const formatedListContactData = (response) => {
  try {
    const formatedData = [];
    response.data.forEach((element) => {
      const company = element.company
        ? element.company.map((data) => {
            return {
              key: data.id.toString(),
              label: data.name,
              value: data.id.toString(),
            };
          })
        : [];

      const title = element.title ? element.title : '';

      const email = element.email
        ? element.email.map((data) => {
            return data;
          })
        : [];

      const phone = element.phone
        ? element.phone.map((data) => {
            return data;
          })
        : [];

      const data = {
        company,
        email,
        phone,
        title,
        name: element.name,
        id: element.id,
      };
      formatedData.push(data);
    });
    const returnData = {
      data: formatedData,
      itemCount: response.meta.itemCount,
      currentPage: response.meta.page,
    };
    return returnData;
  } catch (error) {
    throw new Error('Missing data');
  }
};

export const formatedListCompanyData = (response) => {
  try {
    const formatedData = [];
    response.data.forEach((element) => {
      const contact = element.contact
        ? element.contact.map((data) => {
            return {
              key: data.id.toString(),
              label: data.name,
              value: data.id.toString(),
            };
          })
        : [];

      const email = element.email
        ? element.email.map((data) => {
            return data;
          })
        : [];

      const phone = element.phone
        ? element.phone.map((data) => {
            return data;
          })
        : [];

      const data = {
        contact,
        email,
        phone,
        name: element.name,
        id: element.id,
      };
      formatedData.push(data);
    });
    const returnData = {
      data: formatedData,
      itemCount: response.meta.itemCount,
      currentPage: response.meta.page,
    };
    return returnData;
  } catch (error) {
    throw new Error('Missing data');
  }
};

export const formatedDetailTouchpointData = (response) => {
  try {
    const sla = [];
    const scope = [];
    const estimation = [];
    const pricing = [];
    const quotation = [];
    response.fileTouchPoint.forEach((file) => {
      const newData = {
        id: file.fileId,
        originalname: file.file.originalname,
        note: file.note,
        touchPointId: file.touchPointId,
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
        default:
          break;
      }
    });

    const tasks = response.task
      ? response.task.map((task) => {
          return {
            id: task.id,
            taskname: task.taskname,
            type: task.type,
            userId: task.userId,
            dueDate: task.dueDate,
          };
        })
      : [];

    const returnData = {
      goal: response.goal,
      note: response.note ? response.note : '',
      review: response.review ? response.review : '',
      meetingdate: moment(response.meetingDate),
      sla,
      task: tasks,
      estimation,
      pricing,
      quotation,
      scope,
    };

    return returnData;
  } catch (error) {
    throw new Error('Missing pagination data');
  }
};

export const formatedDetailLeadData = (response) => {
  try {
    const contact = [];
    if (response.contact != null) {
      response.contact.forEach((element) => {
        contact.push({
          key: element.id.toString(),
          value: element.id.toString(),
          label: element.name,
        });
      });
    }
    const relation = [];
    if (response.relatedTo != null) {
      response.relatedTo.forEach((element) => {
        relation.push({
          key: element.id.toString(),
          value: element.id.toString(),
          label: element.name,
        });
      });
    }
    const tag = [];
    if (response.tag != null) {
      response.tag.forEach((element) => {
        tag.push({
          key: element.id,
          value: element.id,
          label: element.tag,
        });
      });
    }

    const company = {
      key: response.company.id,
      label: response.company.name,
    };

    const returnData = {
      company,
      description: response.description,
      rank: response.rank,
      id: response.id,
      name: response.name,
      status: response.status,
      tag,
      contact,
      relation,
      file: response.file,
    };

    return returnData;
  } catch (error) {
    throw new Error('Missing pagination data');
  }
};
