<template>
  <div class="__container">
    <div class="__vendor-info">
      <div class="__logo">
        <img v-img="''" />
      </div>
      <div class="__about">
        <p>
          pxd는 사용자 관찰을 통해 창조적이고 혁신적인 디자인을 컨설팅해 드리는
          전문가 그룹입니다. 제품-기술-비즈니스-사용자에 대한 충분한 이해를
          바탕으로 서비스 전략을 컨설팅합니다. 전문적이고 체계적인
          관찰/분석기법을 통해 사용자들에 대한 인사이트로 사업의 성공을 이끌어
          냅니다. 이동통신, 전자, 인터넷 비즈니스, 소프트웨어, 의료서비스 등
          다양한 도메인의 경험을 가지고 있습니다.
        </p>
      </div>
      <div class="__detail">
        <p><span>대표</span>이재용</p>
        <p><span>웹사이트</span>http://www.pxd.co.kr</p>
        <p><span>기업형태</span>중소기업</p>
        <p><span>본사</span>서울 강남구 신사동 538 제이타워 6층</p>
        <p><span>설립일</span>2002.11.05</p>
        <p><span>사원수</span>53명 (2016)</p>
        <p><span>매출액</span>41.9억 원 ( 2016 )</p>
      </div>
      <div class="__manager">
        <h3>담당자</h3>
        <div v-for="(manager, index) in managers" :key="index">
          <div class="__profile">
            <div class="__profile-img">
              <img v-img="''" />
            </div>
            <p>{{ manager.name }}</p>
          </div>
          <div class="__manager-detail">
            <p>
              <span>직위</span>
              {{ manager.position }}
            </p>
            <p>
              <span>부서</span>
              {{ manager.department }}
            </p>
            <p>
              <span>연락처</span>
              {{ manager.number }}
            </p>
            <p>
              <span>이메일</span>
              {{ manager.email }}
            </p>
          </div>
        </div>
      </div>
      <div class="__product">
        <h3>제품소개</h3>
        <div class="__about-product">
          <p>
            UX, UI, GUI, Visual, Service Design Consulting pxd는 사용자 관찰을
            통해 창조적이고 혁신적인 디자인을 컨설팅해 드리는 전문가 그룹입니다.
            제품-기술-비즈니스-사용자에 대한 충분한 이해를 바탕으로 서비스
            전략을 컨설팅합니다. 전문적이고 체계적인 관찰/분석기법을 통해
            사용자들에 대한 인사이트로 사업의 성공을 이끌어 냅니다. 이동통신,
            전자, 인터넷 비즈니스, 소프트웨어, 의료서비스 등 다양한 도메인의
            경험을 가지고 있습니다.
          </p>
        </div>
      </div>
      <div class="__meeting">
        <button class="__meeting-btn" type="button">미팅신청</button>
      </div>
    </div>
  </div>
</template>
<script>
import DirectiveImage from '../mixin/directive_image';
import VendorMixin from '../mixin/vendor';
export default {
  layout: 'subDefault',
  components: {},
  mixins: [DirectiveImage, VendorMixin],
  data() {
    return {
      managers: [
        {
          name: '최수진',
          position: '팀장',
          department: '디자인컨설팅',
          number: '010-4444-5555',
          email: 'sujin.lee@pxd.co.kr',
        },
        {
          name: '최수진',
          position: '팀장',
          department: '디자인컨설팅',
          number: '010-4444-5555',
          email: 'sujin.lee@pxd.co.kr',
        },
      ],
    };
  },
  mounted() {
    console.log(this.VENDOR_GET.selectVendorItem);
  },
};
</script>

<style lang="scss">
.__vendor-info {
  display: inline-block;
  width: 100%;
  .__logo {
    width: 90px;
    margin: 20px auto;
    > img {
      width: 100%;
    }
  }
  .__about {
    padding: 0 20px;
    > p {
      font-size: 13px;
      color: #777;
      line-height: 1.5;
      word-break: keep-all;
      margin: 0;
    }
  }
  .__detail {
    padding: 0 20px;
    margin: 20px 0;
    > p {
      color: #262626;
      font-weight: 300;
      > span {
        margin-right: 3px;
        font-weight: 400;
      }
    }
  }
  .__manager {
    background-color: #f2f2f2;
    overflow: auto;
    > h3 {
      padding: 0 20px;
      color: #535353;
      margin: 13px 0;
      font-size: 14px;
      font-weight: 400;
    }
    > div {
      background-color: white;
      display: flex;
      align-items: center;
      padding: 10px 20px;
      margin-bottom: 10px;
      &:last-child {
        margin: 0;
      }
    }
    .__profile {
      display: flex;
      align-items: center;
      .__profile-img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        overflow: hidden;
        position: relative;
        border: 1px solid #f1f1f1;
        > img {
          width: 100%;
          position: absolute;
          top: 50%;
          transform: translate(0, -50%);
        }
      }
      > p {
        font-size: 14px;
        color: #262626;
        margin-left: 10px;
      }
    }
    .__manager-detail {
      margin-left: auto;
      margin-right: 40px;
      > p {
        font-weight: 300;
        color: #262626;
        > span {
          margin-right: 3px;
          font-weight: 400;
        }
      }
    }
  }
  .__product {
    background-color: #f2f2f2;
    overflow: auto;
    > h3 {
      padding: 0 20px;
      color: #535353;
      margin: 13px 0;
      font-size: 14px;
      font-weight: 400;
    }
    .__about-product {
      background-color: white;
      overflow: auto;
      > p {
        color: #262626;
        font-weight: 300;
        padding: 0 20px;
        word-break: keep-all;
        line-height: 1.8;
        font-size: 12px;
      }
    }
  }
  .__meeting {
    background-color: #f2f2f2;
    .__meeting-btn {
      font-size: 16px;
      left: 50%;
      position: relative;
      transform: translate(-50%, 0);
      width: 80%;
      padding: 14px;
      margin: 30px 0;
      background: #e83828;
      border: #e83828;
      border-radius: 50px;
      color: white;
    }
  }
}
</style>
