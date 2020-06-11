import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons';
import { FormattedMessage } from 'umi';
import styles from './styles.less';

export default class Pagination extends PureComponent {
  handleClickPrevious = () => {
    const { onChange, currentPage } = this.props;
    if (onChange) {
      onChange(currentPage - 1);
    }
  };

  handleClickNext = () => {
    const { onChange, currentPage } = this.props;
    if (onChange) {
      onChange(currentPage + 1);
    }
  };

  render() {
    const { currentPage, totalPage } = this.props;

    return (
      <div className={styles.pagination}>
        <Button
          className="pagination-btn"
          disabled={currentPage === 1}
          onClick={this.handleClickPrevious}
        >
          <CaretLeftOutlined style={{ color: '#7f8fa4' }} />
        </Button>
        <div className="page-status">
          <FormattedMessage
            id="Pagination.totalOf"
            defaultMessage="Page {currentPage} of {totalPage}"
            values={{ currentPage, totalPage }}
          />
        </div>
        <Button
          className="pagination-btn"
          disabled={currentPage === totalPage}
          onClick={this.handleClickNext}
        >
          <CaretRightOutlined style={{ color: '#7f8fa4' }} />
        </Button>
      </div>
    );
  }
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPage: PropTypes.number.isRequired,
  onChange: PropTypes.func,
};

Pagination.defaultProps = {
  onChange: () => {},
};
