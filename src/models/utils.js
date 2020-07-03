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

export const formatedDetailContactData = (response) => {
  try {
    console.table(response);
    const company = [];
    if (response.company != null) {
      response.company.forEach((element) => {
        company.push({
          key: element.id,
          value: element.name,
        });
      });
    }

    const referral = [];
    if (response.referral != null) {
      response.referral.forEach((element) => {
        referral.push({
          key: element.idTarget,
          value: element.name,
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
      phone,
      name: response.name,
      id: response.id,
    };

    console.table(returnData);

    return returnData;
  } catch (error) {
    throw new Error('Missing pagination data');
  }
};

export const formatedListContactData = (response) => {
  console.table(response);
  try {
    const formatedData = [];
    response.data.forEach((element) => {
      const company = [];
      if (element.company != null) {
        element.company.forEach((data) => {
          company.push({
            key: data.id,
            value: data.name,
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
    console.table(returnData);

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
            key: data.id,
            value: data.name,
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
    console.table(returnData);

    return returnData;
  } catch (error) {
    throw new Error('Missing pagination data');
  }
};
