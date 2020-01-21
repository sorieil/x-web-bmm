<template>
  <div class="__container">
    <div class="__schedule">
      <div class="__user">
        <div
          v-if="profileManager.businessVendorFieldManagerValues"
          class="__profile"
        >
          <div class="__profile-img">
            <img v-img="''" />
          </div>
          <p
            v-managerName="profileManager.businessVendorFieldManagerValues"
          ></p>
        </div>
        <div
          v-if="profileManager.businessVendorFieldManagerValues"
          class="__profile-detail"
        >
          <p
            v-for="(item,
            index) in profileManager.businessVendorFieldManagerValues"
            :key="index"
          >
            <span v-if="item.businessVendorField.name !== '담당자명'">{{
              item.businessVendorField.name
            }}</span>
            {{ item.businessVendorField.name !== '담당자명' ? item.value : '' }}
          </p>
        </div>
        <img
          @click="goProfile"
          class="__setting-icon"
          src="../assets/images/common/icon_setting.svg"
        />
      </div>
      <div class="__dates">
        <div class="__scroll-wrap">
          <div :style="{ width: dateScrollWidth + 'px' }" class="__scroll">
            <div
              v-for="(date, index) in dates"
              :key="index"
              :class="{ __active: activeDate === index }"
              @click="fnDateChange(index, activeDate, $event)"
              class="__item"
            >
              <span>{{ date.mm }}.{{ date.dd }}</span>
              <span>{{ date.week }}</span>
            </div>
          </div>
        </div>
      </div>
      <ul v-if="times" class="__times">
        <li v-for="(item, index) in times" :key="index">
          <!-- 예약 가능 -->
          <div v-if="item.businessMeetingTimeList.use === 'yes'">
            <!--  여기에서 내부적으로 예약의 상황에 따라서 처리 우선은 방 하나만 있다는 가정아래   -->

            <!-- businessMeetingRoomReservation 의 null 값으로 체크 -->
            <div v-if="!item.meetingAvailable" class="__time-block">
              <span class="__time">
                {{ item.businessMeetingTimeList.timeBlock }}
              </span>
              <span class="__company">{{ item.userName }}</span>
              <!-- <span class="__user" @click="fnOpneMeetingInfo()">예약명</span> -->
              <span class="__status __complate">예약완료</span>
            </div>
            <div v-else class="__time-block">
              <span class="__time">
                {{ item.businessMeetingTimeList.timeBlock }}
              </span>
              <span class="__company">{{ item.userName }}</span>
              <span @click="fnOpneMeetingInfo()" class="__user"></span>
              <span @click="openStatusModal(index)" class="__status __possible"
                >예약가능</span
              >
            </div>
          </div>
          <!-- 예약 불가능 -->
          <div v-else class="__time-block __disabled">
            <span class="__time">
              {{ item.businessMeetingTimeList.timeBlock }}
            </span>
            <span class="__company">{{
              item.businessMeetingRoomReservation
            }}</span>
            <!-- <span class="__user" @click="fnOpneMeetingInfo()"></span> -->
            <span @click="openStatusModal(index)" class="__status __complete"
              >예약불가</span
            >
          </div>
          <!-- <div v-else-if="item.status === '예약불가'" class="__disabled">
            <span class="__time">{{ item.time }}</span>
            <span class="__company">{{ item.company }}</span>
            <span class="__user" @click="fnOpneMeetingInfo()">{{
              item.user
            }}</span>
            <span
              class="__status __impossible"
              @click="openStatusModal(index)"
              >{{ item.status }}</span
            >
          </div>-->
          <!-- <div v-else-if="item.status === '신청대기'" class="__waiting">
            <span class="__time">{{ item.time }}</span>
            <span class="__company">{{ item.company }}</span>
            <span class="__user" @click="fnOpneMeetingInfo()">{{
              item.user
            }}</span>
            <span class="__status __waiting" @click="openStatusModal(index)">
              {{ item.status }}
            </span>
          </div>-->
        </li>
      </ul>
    </div>
    <Modal
      ref="MeetingModal"
      :class="{
        fadeInUpBig: activeMeetingModal,
        fadeOutUpBig: !activeMeetingModal,
      }"
      style="display:none"
      class="animated"
    >
      <div slot="ModalContent" class="__modal-content">
        <div class="__header">
          <span class="__title">미팅 신청 정보</span>
          <button @click="modalClose" class="__close">
            <i class="material-icons-round">close</i>
          </button>
        </div>
        <div v-if="activeMeetingModal" class="__content">
          <div class="__applicant">
            <h3>신청자</h3>
            <div>
              <div class="__profile">
                <div class="__profile-img">
                  <img v-img="''" />
                </div>
                <p>{{ profile.name }}</p>
              </div>
              <div class="__applicant-detail">
                <p>
                  <span>직위</span>
                  {{ profile.position }}
                </p>
                <p>
                  <span>부서</span>
                  {{ profile.department }}
                </p>
                <p>
                  <span>연락처</span>
                  {{ profile.number }}
                </p>
                <p>
                  <span>이메일</span>
                  {{ profile.email }}
                </p>
              </div>
            </div>
          </div>
          <div class="__date-time">
            <h3>날짜/시간</h3>
            <div>
              <span>{{ meetingDateMM }}월 {{ meetingDateDD }}일</span>
              <span class="timepicker"
                >{{ meetingTime }} {{ meetingAmPm }}</span
              >
              <span>15min</span>
            </div>
          </div>
          <div class="__request-content">
            <h3>메모</h3>
            <div>
              <p class="__memo-content">{{ meetingMemo }}</p>
            </div>
          </div>
          <div class="__room">
            <h3>미팅룸</h3>
            <div>{{ meetingRoom }}</div>
          </div>

          <div class="__meeting-btns">
            <button class="__meeting-cancel-btn" type="button">
              미팅 신청 취소
            </button>
            <button class="__meeting-btn" type="button">미팅 신청 확인</button>
          </div>
        </div>
      </div>
    </Modal>
    <Modal
      ref="StatusModal"
      :class="{
        fadeInUpBig: activeStatusModal,
        fadeOutUpBig: !activeStatusModal,
      }"
      style="display:none"
      class="animated"
    >
      <div slot="ModalContent" class="__modal-content">
        <div class="__header">
          <span class="__title">상태 설정</span>
          <button @click="modalClose" class="__close">
            <i class="material-icons-round">close</i>
          </button>
        </div>
        <div v-if="activeStatusModal" class="__content">
          <div class="__date-time">
            <h3>날짜/시간</h3>
            <div>
              <span>{{ meetingDateMM }}월 {{ meetingDateDD }}일</span>
              <span class="timepicker"
                >{{ meetingTime }} {{ meetingAmPm }}</span
              >
              <span>15min</span>
            </div>
          </div>
          <div class="__status-btns">
            <button class="__status-btn" type="button">확인</button>
          </div>
          <div class="__status-change">
            <h3>상태</h3>
            <ul class="__items">
              <li
                v-for="(item, index) in reservationStatus"
                :key="index"
                :class="[item.status ? '__active' : '']"
                class="__item"
              >
                <span>{{ item.text }}</span>
                <div class="__favorite">
                  <IconCheckbox />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Modal>
  </div>
</template>
<script>
import DirectiveImage from '../mixin/directive_image';
import MixinUserType from '../mixin/user';
import Modal from '../components/common/ModalFull';
import IconCheckbox from '../components/features/IconCheckbox';
import { SUB_HEADER_SET } from '../store/constant_types';
import BusinessTime from '../service/business_time';
import UserSchedule from '../service/user_schedule';
const moment = require('moment');
export default {
  layout: 'sub_default',
  components: { Modal, IconCheckbox },
  directives: {
    managerName: {
      inserted(el, binding, vnode) {
        const item = binding.value;
        // console.log('bind valeu:', item);
        const managerName = item.filter(
          (v) => v.businessVendorField.name === '담당자명'
        )[0].value;
        // console.log();
        vnode.elm.textContent = managerName;
      },
    },
  },
  mixins: [DirectiveImage, MixinUserType],
  data() {
    return {
      dates: [],
      times: [],
      profile: {
        name: '최수진',
        position: '팀장',
        department: '디자인컨설팅',
        number: '010-4444-5555',
        email: 'sujin.lee@pxd.co.kr',
      },
      profileManager: {
        name: '최수진',
        position: '팀장',
        department: '디자인컨설팅',
        number: '010-4444-5555',
        email: 'sujin.lee@pxd.co.kr',
      },
      meetingDateMM: '00',
      meetingDateDD: '00',
      meetingTime: '00:00',
      meetingAmPm: 'AM',
      activeDate: 0,
      dateScrollWidth: null,
      activeMeetingModal: false,
      activeStatusModal: false,
      meetingMemo: '메모 내용입니다.',
      memoRemoveIcon: false,
      meetingRoom: '네트워킹 테이블 A81',
      reservationStatus: [
        {
          text: '예약가능',
          status: true,
        },
        {
          text: '예약불가',
          status: false,
        },
      ],
    };
  },
  created() {
    this.getBusinessTime().then((r) => {
      // console.log(']]]]]] result ', r);
    });
    // await this.getSchedule(this.dates[0].date);
  },
  mounted() {
    this.dateScrollWidth = this.dates.length * 120;
    this.$store.commit(SUB_HEADER_SET.load, { subHeaderTitle: '내 스케줄' });

    // 이부분이 계속 오류나고 있는 것이다.
    // console.log('==========> <<<<<<<<<<<<<<<<<<<<< ', this.dates[0]);
  },
  methods: {
    async getBusinessTime() {
      const service = new BusinessTime(this);
      const { result } = await service.get();

      // 스케쥴의 담당자 혹은 바이어의 정보를 가져온다.
      this.profile = result[0].userBuyer || null;
      this.profileManager = result[0].businessVendorManager || null;

      // console.log('result:', this.profile);
      // console.log('result manager:', this.profileManager);
      const startDate = moment(result[0].businessTime.startDate).add(
        -1,
        'days'
      );
      const endDate = moment(result[0].businessTime.endDate);
      const diffDay = endDate.diff(startDate, 'days');
      this.dates = [];
      return setTimeout(() => {
        for (let i = 0; i < diffDay; i++) {
          const newDate = startDate.add(1, 'days');
          this.dates.push({
            mm: newDate.format('MM'),
            dd: newDate.format('DD'),
            week: newDate.format('ddd').toUpperCase(),
            date: newDate.format('YYYY-MM-DD'),
          });
        }
        return this.dates;
      });
    },
    // 스케쥴 정보를 선택한 날짜 기준으로 가져온다.
    async getSchedule(date) {
      const service = new UserSchedule(this);
      const { result } = await service.get(date);
      this.times = result;
    },
    fnDateChange(index, active, event) {
      this.activeDate = index;
      this.getSchedule(this.dates[index].date);
    },
    fnOpneMeetingInfo() {
      const meetingModal = this.$refs.MeetingModal.$el;
      meetingModal.style = '';

      this.activeMeetingModal = true;

      const modalFullEl = document.getElementsByClassName('ModalFull')[0];

      modalFullEl.style.top = window.scrollY + 'px';
      document.body.style.overflow = 'hidden';
    },
    modalClose() {
      this.activeMeetingModal = false;
      this.activeStatusModal = false;

      document.body.style.overflow = 'auto';
    },
    openStatusModal(index) {
      const statusModal = this.$refs.StatusModal.$el;
      statusModal.style = '';

      this.activeStatusModal = true;

      const modalFullEl = document.getElementsByClassName('ModalFull')[1];

      modalFullEl.style.top = window.scrollY + 'px';
      document.body.style.overflow = 'hidden';

      if (this.times[index].status === '예약가능') {
        this.reservationStatus[0].status = true;
        this.reservationStatus[1].status = false;
      } else {
        this.reservationStatus[0].status = false;
        this.reservationStatus[1].status = true;
      }
    },
    goProfile() {
      if (this.USER_GET.type === 'manager') {
        this.$router.replace({ path: '/my-profile-manager' });
      } else {
        this.$router.replace({ path: '/my-profile' });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.__schedule {
  background-color: #f2f2f2;
  width: 100%;
  padding-top: 40px;
  .__user {
    position: relative;
    background-color: white;
    display: flex;
    align-items: center;
    padding: 10px 20px;
    margin-bottom: 5px;
    .__profile {
      margin-left: 20px;
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
        margin: 5px 0 0 10px;
      }
    }
    .__profile-detail {
      margin-left: 40px;
      > p {
        font-weight: 300;
        color: #262626;
        > span {
          margin-right: 3px;
          font-weight: 400;
        }
      }
    }
    .__setting-icon {
      position: absolute;
      right: 16px;
      top: 15px;
    }
  }
  .__dates {
    background-color: white;
    .__scroll-wrap {
      overflow-y: hidden;
      overflow-x: auto;
      width: 290px;
      margin: 0 auto;
      white-space: nowrap;
      scroll-behavior: unset;
      -ms-overflow-style: none; // IE 10+
      scrollbar-width: none; // Firefox
      &::-webkit-scrollbar {
        display: none; // Safari and Chrome
      }
      .__scroll {
        transform: translate(-27px, 0);
        &::before,
        &::after {
          content: '';
          width: 120px;
          display: inline-block;
        }
        .__item {
          margin: 10px 0;
          padding: 6px;
          border-radius: 30px;
          width: 104px;
          text-align: center;
          color: #262626;
          display: inline-block;
          > span {
            font-size: 15px;
            &:first-child {
              font-weight: 600;
            }
          }
        }
        .__active {
          background-color: #e83828;
          color: white;
        }
      }
    }
  }
  .__times {
    padding: 0;
    margin: 0;
    min-height: calc(100vh - 217px);
    > li {
      list-style: none;
      .__time-block {
        display: flex;
        align-content: center;
        padding: 15px 20px;
        border-top: 1px solid #d3d3d3;
        background-color: white;
        > span {
          font-size: 13px;
          color: #262626;
          margin-left: 30px;
          &:first-child {
            margin-left: 0;
          }
        }
        .__status {
          margin-left: auto;
        }
        .__user {
          padding: 0;
          font-size: 12px;
          color: #777777;
        }
        .__company {
          font-size: 15px;
          color: #262626;
        }
        .__complete {
          color: #ba0a0a;
        }
        .__possible {
          color: #0a62d9;
        }
        .__impossible {
          color: #383838;
        }
        .__waiting {
          color: #0bc499;
        }
      }
      .__disabled {
        background-color: #f8f8f8;
      }
    }
  }
}
.ModalFull {
  top: 0;
  > .__overlay {
    display: none;
  }
  > .__modal-content {
    background-color: white;
    width: 100%;
    height: 100vh;
    .__header {
      position: relative;
      border-top: 0;
      border-left: 0;
      border-right: 0;
      border-bottom: 1px solid #d3d3d3;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 40px;
      span {
        font-size: 1.33em;
      }
      button {
        border: none;
        outline: none;
        background-color: transparent;
      }
      .__reset {
        position: absolute;
        font-size: 1em;
        font-weight: 300;
        left: 0;
      }
      .__title {
        font-size: 1.5em;
        font-weight: 500;
      }
      .__close {
        position: absolute;
        right: 0;
        > .material-icons-round {
          font-size: 1.5em;
        }
      }
    }
    .__content {
      background-color: #f4f4f4;
      min-height: calc(100vh - 40px);
      position: relative;
      > div {
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
        }
      }
      .__applicant {
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
        .__applicant-detail {
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
      .__date-time {
        > div {
          justify-content: space-between;
          > span {
            font-size: 15px;
            color: #777777;
            > .datetime-picker {
              position: absolute;
              margin-top: -20px;
              width: 70px;
              > div {
                > input {
                  opacity: 0;
                  min-width: 0;
                }
              }
              .year-month-wrapper {
                display: flex;
                justify-content: space-between;
                background-color: #ababab;
                .month-setter {
                  display: flex;
                  justify-content: space-between;
                  align-content: center;
                  .year,
                  .month {
                    text-align: center;
                    font-size: 15px;
                    font-weight: 400;
                  }
                  .nav-l,
                  .nav-r {
                    background-color: #ababab;
                  }
                }
              }
              .calender-div {
                box-shadow: none;
                border: 1px solid #d3d3d3;
              }
              .headers {
                > .days {
                  color: #ababab;
                  font-weight: 400;
                  font-size: 15px;
                  width: 12.7%;
                }
              }
              .week {
                .port {
                  font-size: 14px;
                  width: 12.7%;
                  height: 35px;
                  line-height: 1.7;
                }
                .activePort {
                  background-color: #ababab;
                  border-radius: 50%;
                }
              }

              .okButton {
                color: #585858;
                font-weight: 400;
                font-size: 15px;
                padding: 6px 20px;
                padding: 5px 20px;
                float: inherit;
                border-radius: 30px;
                border: 1px solid #d3d3d3;
                margin-left: 10px;
              }
              .ok {
                background-color: #e83828;
                border: 1px solid #e83828;
                color: white;
                float: right;
              }
            }
          }
          .timepicker {
            .calender-div {
              position: absolute;
              left: 50%;
              transform: translate(-50%, 0);
            }
            .time-picker {
              display: block;
              text-align: center;
              #j-hour,
              #j-minute,
              .time-separator > span {
                font-size: 20px;
                padding: 0 4px;
              }
              .scroll-hider {
                width: 45px;
                height: 150px;
                box-shadow: none;
                border: 1px solid #d3d3d3;
                > ul {
                  height: 150px;
                }
              }
            }
          }
        }
      }
      .__request-content {
        position: relative;
        .__memo-content {
          width: 100%;
          height: 22vh;
          font-size: 15px;
          color: #777777;
          overflow: auto;
        }
        .material-icons {
          font-size: 13px;
          padding: 2px;
          background-color: #cccccc;
          position: absolute;
          right: 25px;
          top: 55px;
          color: white;
          border-radius: 50%;
        }
      }
      .__room {
        > div {
          font-size: 15px;
          color: #777777;
        }
      }

      .__meeting-btns {
        background-color: #f2f2f2;
        display: flex;
        justify-content: space-between;
        margin: 0 20px;
        position: absolute;
        width: calc(100% - 40px);
        bottom: 5vh;
        // .__meeting-btn {
        //   font-size: 16px;
        //   left: 50%;
        //   position: relative;
        //   transform: translate(-50%, 0);
        //   width: 50%;
        //   padding: 14px;
        //   background: #e83828;
        //   border: #e83828;
        //   border-radius: 50px;
        //   color: white;
        // }
        > button {
          background: #e4e4e4;
          border: #e4e4e4;
          color: #383838;
          width: 48%;
          font-size: 16px;
          position: relative;
          padding: 14px;
          border-radius: 50px;
        }
        .__meeting-btn {
          background: #e83828;
          border: #e83828;
          color: white;
        }
      }

      .__status-btns {
        background-color: #f2f2f2;
        display: flex;
        justify-content: space-between;
        margin: 0 20px;
        position: absolute;
        width: calc(100% - 40px);
        bottom: 5vh;
        > button {
          font-size: 16px;
          left: 50%;
          position: relative;
          transform: translate(-50%, 0);
          width: 80%;
          padding: 14px;
          background: #e83828;
          border: #e83828;
          border-radius: 50px;
          color: white;
        }
      }

      .__status-change {
        .__items {
          background-color: white;
          .__active {
            background-color: white;
          }
        }
        .IconCheckbox {
          .material-icons {
            color: white;
            border: 1px solid #d3d3d3;
            border-radius: 50%;
            font-size: 16px;
            padding: 6px;
          }
          .__active {
            background-color: #e83828;
            border: 1px solid #e83828;
            padding: 6px;
          }
        }
      }
    }
  }
}
</style>
