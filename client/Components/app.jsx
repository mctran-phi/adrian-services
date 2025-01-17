import React from 'react';
import Axios from 'axios';
import Review from './review.jsx';
import Mentions from './Mentions.jsx';
import Images from './Images.jsx';
import Star from './Star.jsx';
import styled from 'styled-components';
import WriteReview from './WriteReview.jsx';

const ReviewComp = styled.div`
  display: flex;
  justify-content: space-between;
  overflow: hidden;
`;

const StarComp = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 2px solid #e7e7e7;
  width: 30vw;
  min-width: 400px;
  padding-left: 50px;
`;

const AmazonText = styled.h1`
  font-family: 'Roboto', sans-serif;
  font-size: 20px;
`;

const Pagination = styled.div`
  display: inline-block;
`;

const InsideDiv = styled.div`
  color: black;
  padding: 8px 16px;
  text-decoration: none
`;

const AmazonMore = styled.h1`
  font-family: 'Roboto', sans-serif;
  font-size: 15px;
  font-weight: 500;
  color: #007185;
  cursor: grab;
  &&:hover   {
    text-decoration: underline;
  }
`;

const PagNum = styled.h1`
  position: relative;
  color: #007185;
  font-family: 'Roboto', sans-serif;
  float: left;
  font-size: 15px;
  padding: 8px 16px;
  text-decoration: none;
  cursor: grab;
  &&:hover {
    text-decoration: underline;
  }
  &&:active {
    background-color: #00464F;
    color: #D7E8EA;
  }
`;

const TestComp = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  width: 60vw;
`;


const MetionsBlock = styled.div`
  width: 50rem;
  display: flex;
`;

const ImageFlex = styled.div`
  display: flex;
  flex-direction: column;
`;

const Selector = styled.select`
  width: 10%;
`;

const CurrentMetion = styled.h1`
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  font-size: 20px;
`;

const FlexMetion = styled.div`
  display: flex;
  flex-direction: row;
`;

const ClearMetion = styled.h1`
  postion: relative;
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  font-size: 20px;
  color: #007185;
  left: 2rem; !!important
  cursor:grab;

  &&:hover {
    text-decoration: underline;

  }
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      showingReviews: [],
      metionedReview: '',
      paginatedArray: [],
      currentSelector: 'top',
      currentLength: 0,
      currentPage: 1,
    };
  }

  componentDidMount() {
    Axios('http://localhost:3333/reviews').then(reviews => {
      if (this.state.currentSelector === 'top') {
        reviews.data.sort((a, b) => {
          return a.foundHelpful - b.foundHelpful;
        });
        reviews.data.reverse();
      }

      this.setState({
        reviews: reviews.data
      });

      let paginatedArrays = [];
      let currentArray = [];
      for (let i = 0; i < this.state.reviews.length; i++) {

        if (currentArray.length >= 4) {
          paginatedArrays.push(currentArray);
          currentArray = [];
        }
        currentArray.push(this.state.reviews[i]);
      }

      if (currentArray.length !== 0) {
        paginatedArrays.push(currentArray);
      }
      this.setState({
        showingReviews: paginatedArrays[1]
      });

      this.setState({
        paginatedArray: paginatedArrays
      });
    });

  }

  changeMetionedReview(query) {
    Axios('http://localhost:3333/reviews').then(reviews => {
      this.setState({
        showingReviews: reviews.data
      });

      this.setState({
        metionedReview: query
      });
    });
  }

  changePage(val) {
    this.setState({
      showingReviews: this.state.paginatedArray[val]
    });

    this.setState({
      currentPage: val
    });
  }

  resetSearch () {
    this.setState({
      metionedReview: ''
    });
    this.componentDidMount();
  }

  changeValue(e) {
    this.setState({
      currentSelector: e.target.value
    });
    this.componentDidMount();
  }

  render() {
    let doesInclude = this.state.metionedReview;
    let pagNum = 0;
    let currNum = 0;
    let newPaginatedArray = this.state.paginatedArray.slice(0, this.state.currentPage + 2);

    return (
      <ReviewComp>
        <StarComp>
          <Star props={this.state.reviews} />
          <WriteReview />
        </StarComp>
        <TestComp>
          <ImageFlex>
            <AmazonText>Customer images</AmazonText>
            <Images />
            <AmazonMore>See all customer images</AmazonMore>
          </ImageFlex>
          <AmazonText>Read Reviews that mention</AmazonText>
          <MetionsBlock>
            <Mentions changeReview={this.changeMetionedReview.bind(this)} />
          </MetionsBlock>
          <Selector name="cars" id="cars" onChange={this.changeValue.bind(this)}>
            <option value="top">Top reviews</option>
            <option value='timed'>Most recent</option>
          </Selector>
          <AmazonText>Top reviews from the United States.</AmazonText>
          { this.state.metionedReview !== '' ? <FlexMetion><CurrentMetion>Showing reviews with "{this.state.metionedReview}"</CurrentMetion> <ClearMetion onClick = {this.resetSearch.bind(this)}> Clear filter.</ClearMetion></FlexMetion> : null}
          {this.state.showingReviews.map(item => {
            return item.review.includes(doesInclude) ? <Review key={item._id} props={item} /> : null;
          })
          }
          <Pagination>
            {newPaginatedArray.map((item, i) => {
              if (currNum === 0) {
                pagNum = 0;
              } else {
                pagNum++;
              }
              currNum++;
              let AssignedVariable = pagNum;
              return pagNum !== 0 ? <PagNum key={item[i]._id} onClick={() => this.changePage(AssignedVariable)}>{pagNum}</PagNum> : null;
            })
            }
          </Pagination>
        </TestComp>
      </ReviewComp>
    );
  }
}

export default App;