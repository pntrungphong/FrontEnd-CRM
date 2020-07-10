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
    const formatedData = [];
    response.data.forEach((element) => {
      const data = {
        name: element.name,
        rank: element.rank,
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
    };
    return returnData;
  } catch (error) {
    throw new Error('Missing pagination data');
  }
};

export const formatedDetailContactData = (response) => {
  try {
    const company = [];
    if (response.company != null) {
      response.company.forEach((element) => {
        company.push({
          key: element.id.toString(),
          label: element.name,
          value: element.id.toString(),
        });
      });
    }
    const tag = [];
    if (response.tag != null) {
      response.tag.forEach((element) => {
        tag.push({
          key: element.id.toString(),
          value: element.id.toString(),
          label: element.tag,
        });
      });
    }

    const referral = [];
    if (response.referral != null) {
      response.referral.forEach((element) => {
        referral.push({
          key: element.idTarget.toString(),
          value: element.idTarget.toString(),
          label: element.name,
        });
      });
    }
    const website = [];
    if (response.website != null) {
      response.website.forEach((element) => {
        website.push({
          type: element.type,
          url: element.url,
        });
      });
    }
    const email = [];
    if (response.email != null) {
      response.email.forEach((element) => {
        email.push({
          type: element.type,
          url: element.url,
        });
      });
    }

    const address = [];
    if (response.address != null) {
      response.address.forEach((element) => {
        address.push(element);
      });
    }

    const phone = [];
    if (response.phone != null) {
      response.phone.forEach((element) => {
        phone.push({
          type: element.type,
          number: element.number,
        });
      });
    }
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
    throw new Error('Missing pagination data');
  }
};

export const formatedDetailCompanyData = (response) => {
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
    const tag = [];

    if (response.tag != null) {
      response.tag.forEach((element) => {
        tag.push({
          key: element.id.toString(),
          value: element.id.toString(),
          label: element.tag,
        });
      });
    }

    const website = [];
    if (response.website != null) {
      response.website.forEach((element) => {
        website.push({
          type: element.type,
          url: element.url,
        });
      });
    }
    const email = [];
    if (response.email != null) {
      response.email.forEach((element) => {
        email.push({
          type: element.type,
          url: element.url,
        });
      });
    }

    const address = [];
    if (response.address != null) {
      response.address.forEach((element) => {
        address.push(element);
      });
    }

    const phone = [];
    if (response.phone != null) {
      response.phone.forEach((element) => {
        phone.push({
          type: element.type,
          number: element.number,
        });
      });
    }

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
    throw new Error('Missing pagination data');
  }
};

export const formatedListContactData = (response) => {
  try {
    const formatedData = [];
    response.data.forEach((element) => {
      const company = [];
      if (element.company != null) {
        element.company.forEach((data) => {
          company.push({
            label: data.name,
            key: data.id.toString(),
            value: data.id.toString(),
          });
        });
      }
      const title = [];
      if (element.title != null) {
        title.push(element.title);
      }

      const email = [];
      if (element.email != null) {
        element.email.forEach((data) => {
          email.push(data);
        });
      }

      const phone = [];
      if (element.phone != null) {
        element.phone.forEach((data) => {
          phone.push(data);
        });
      }
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
    throw new Error('Missing pagination data');
  }
};

export const formatedListCompanyData = (response) => {
  try {
    const formatedData = [];
    response.data.forEach((element) => {
      const contact = [];
      if (element.contact != null) {
        element.contact.forEach((data) => {
          contact.push({
            label: data.name,
            key: data.id.toString(),
            value: data.id.toString(),
          });
        });
      }

      const email = [];
      if (element.email != null) {
        element.email.forEach((data) => {
          email.push(data);
        });
      }

      const phone = [];
      if (element.phone != null) {
        element.phone.forEach((data) => {
          phone.push(data);
        });
      }
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
    throw new Error('Missing pagination data');
  }
};

export const formatedDetailLeadData = (response) => {
  try {
    // const contact = [];
    // if (response.contact != null) {
    //   response.contact.forEach((element) => {
    //     contact.push({
    //       key: element.id,
    //       value: element.id,
    //       label: element.name,
    //     });
    //   });
    // }
    const contact = [];
    if (response.contact != null) {
      response.contact.forEach((element) => {
        contact.push({
          key: element.id,
          value: element.id,
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

    const returnData = {
      company: response.company,
      description: response.description,
      rank: response.rank,
      id: response.id,
      name: response.name,
      tag,
      contact,
      file: response.file
    };

    return returnData;
  } catch (error) {
    throw new Error('Missing pagination data');
  }
};
