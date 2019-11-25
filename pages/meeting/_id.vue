<template>
  <div class="__container">
    <div class="__meeting">
      <div class="__dates">
        <div
          v-if="dates.length > 0"
          class="__scroll"
          :style="{ width: dateScrollWidth + 'px' }"
        >
          <div
            v-for="(date, index) in dates"
            :key="index"
            class="__item"
            :class="{ __active: activeDate === index }"
            @click="fnDateChange(index, activeDate, $event)"
          >
            <span>{{ date.mm }}.{{ date.dd }}</span>
            <span>{{ date.week }}</span>
          </div>
        </div>
      </div>
      <ul class="__times">
        <li v-for="(item, index) in times" :key="item.id">
          <div
            v-if="item.businessMeetingTimeList.use === 'yes'"
            class="__time-block"
          >
            <div v-if="item.meetingAvailable">
              <span class="__time" @click="fnOpneMeetingRequest(index)">{{
                item.businessMeetingTimeList.timeBlock
              }}</span>
              <span class="__status __complete">예약가능</span>
            </div>
            <div v-else>
              <span class="__time">{{
                item.businessMeetingTimeList.timeBlock
              }}</span>
              <span class="__status __possible">예약완료</span>
            </div>
          </div>
          <div v-else class="__time-block __disabled">
            <span class="__time">{{
              item.businessMeetingTimeList.timeBlock
            }}</span>
            <span class="__status __impossible">예약불가</span>
          </div>
        </li>
      </ul>
    </div>
    <Modal
      class="__meeting-modal animated"
      :class="{
        fadeInUpBig: modalStatus,
        fadeOutDownBig: !modalStatus,
        __active: modalStatus,
      }"
    >
      <div slot="ModalContent" class="__modal-content">
        <div class="__header">
          <span class="__title">미팅 신청 정보</span>
          <button class="__close" @click="modalClose">
            <i class="material-icons-round">close</i>
          </button>
        </div>
        <div v-if="modalStatus && profile" class="__content">
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
                  <span>연락처</span>
                  {{ profile.phone }}
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
              <span ref="selectDate">
                {{ dateBlock.split('-')[1] }}월 {{ dateBlock.split('-')[2] }}일
              </span>
              <span ref="selectTime" class="timepicker">{{ timeBlock }}</span>
              <span>{{ timeInterval }} min</span>
            </div>
          </div>
          <div class="__request-content">
            <h3>메모</h3>
            <div>
              <i
                v-if="memoRemoveIcon"
                class="material-icons"
                @click="fnMemoRemove"
                >close</i
              >
              <textarea v-model="meetingMemo" placeholder="내용"></textarea>
            </div>
          </div>
          <div class="__room">
            <h3>미팅룸</h3>
            <div>{{ meetingRoom }}</div>
          </div>

          <div class="__meeting-btns">
            <button class="__meeting-btn" type="button" @click="submit">
              미팅 신청 확인
            </button>
            <button
              class="__meeting-cancel-btn"
              type="button"
              @click="modalClose"
            >
              미팅 신청 취소
            </button>
          </div>
        </div>
      </div>
    </Modal>
  </div>
</template>
<script>
import DirectiveImage from '../../mixin/directive_image';
import { SUB_HEADER_SET } from '../../store/constant_types';
import BusinessTime from '../../service/business_time';
import UserSchedule from '../../service/user_schedule';
import BusinessMeetingRoom from '../../service/business_meeting_room';
import MeetingReservation from '../../service/meeting_reservation';
import Modal from '~/components/common/ModalFull';
const moment = require('moment');
export default {
  layout: 'sub_default',
  validate({ params }) {
    // console.log('params:', params);
    // 숫자만 가능합니다.
    return /^\d+$/.test(params.id);
  },
  components: { Modal },
  mixins: [DirectiveImage],
  data() {
    return {
      dates: [],
      times: [],
      applicant: {
        name: '최수진',
        position: '팀장',
        department: '디자인컨설팅',
        number: '010-4444-5555',
        email: 'sujin.lee@pxd.co.kr',
      },
      meetingSelectDate: null,
      meetingSelectTime: null,
      dateBlock: '00',
      meetingDateDD: '00',
      timeBlock: '00:00',
      meetingAmPm: 'AM',
      activeDate: 0,
      dateScrollWidth: null,
      modalStatus: false,
      meetingMemo: null,
      memoRemoveIcon: false,
      meetingRoom: '네트워킹 테이블 A81',
      timeInterval: 0,
      reservationDateBlock: null,
    };
  },
  watch: {
    meetingSelectDate(val) {
      const date = val.split('/');
      this.meetingDateMM = date[0];
      this.meetingDateDD = date[1];
    },
    meetingSelectTime(val) {
      const time = val.split(':');
      this.meetingTime = val;

      if (time[0] < 12) {
        this.meetingAmPm = 'AM';
      } else {
        this.meetingAmPm = 'PM';
      }
    },
    meetingMemo(val) {
      if (val.length > 0) {
        this.memoRemoveIcon = true;
      } else {
        this.memoRemoveIcon = false;
      }
    },
  },
  created() {
    this.getBusinessTime();
  },
  mounted() {
    this.dateScrollWidth = this.dates.length * 120;
    this.$store.commit(SUB_HEADER_SET.load, { subHeaderTitle: '미팅신청' });
  },

  methods: {
    async submit() {
      if (this.meetingMemo !== null) {
        // console.log('this.reservationDateBlock:', this.reservationDateBlock);
        const service = new MeetingReservation(this);
        const data = {
          vendorId: this.$route.params.id, // Vendor id
          vendorTimeListId: this.reservationDateBlock.id, // vendorTimeBlock id
          businessMeetingTimeList: this.reservationDateBlock
            .businessMeetingTimeList.id, // businessTimeBlock id
          memo: this.meetingMemo, // Memo
        };
        const query = await service.post(data);
        // console.log('query', query);

        if (query) {
          alert('예약이 완료 되었습니다.');
          this.getBusinessTime();
          this.modalClose();
        } else {
          alert('이미 예약이 완료 되었습니다. 다른 시간대를 선택해주세요.');
        }
      } else {
        alert('메모를 입력해주세요.');
      }
    },
    async getSchedule(date) {
      const service = new UserSchedule(this);
      const { result } = await service.get(date);
      this.times = result;
    },
    async getBusinessTime() {
      const service = new BusinessTime(this);
      const { result } = await service.get();
      console.log('profile:', result[0].userBuyer);
      this.profile = result[0].userBuyer || null;
      this.timeInterval = result[0].businessTime.intervalTime;
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
        this.dateScrollWidth = this.dates.length * 120;
        return this.dates;
      });
    },
    fnDateChange(index, active, event) {
      this.activeDate = index;
      this.getSchedule(this.dates[index].date);
    },
    async getBusinessMeetingRoom() {
      const service = new BusinessMeetingRoom(this);
      const { result } = await service.get();
      this.meetingRoom = result.reduce((aa, cc) => {
        aa = `${cc.name} [${cc.location}] `;
        return aa;
      }, '');
    },
    fnOpneMeetingRequest(index) {
      this.getBusinessMeetingRoom();
      const item = this.times[index];
      // console.log('profile:', this.profile);
      // console.log('타임블럭 번호: ', item);
      this.reservationDateBlock = item;
      this.dateBlock = item.businessMeetingTimeList.dateBlock;
      this.timeBlock = item.businessMeetingTimeList.timeBlock;
      this.modalStatus = true;

      setTimeout(() => {}, 10);
    },
    modalClose() {
      this.modalStatus = false;
    },
    fnMemoRemove() {
      this.meetingMemo = '';
    },
  },
};
</script>

<style lang="scss">
.__meeting {
  width: 100%;
  // padding-top: 40px;
  .__dates {
    padding-top: 40px;
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
  .__times {
    padding: 10px 0;
    margin: 0;
    background-color: #f2f2f2;
    min-height: calc(100vh - 89px);

    > li {
      list-style: none;
      .__time-block {
        display: flex;
        align-content: center;
        justify-content: space-between;
        padding: 15px 20px;
        border-top: 1px solid #d3d3d3;
        background-color: white;
        > span {
          font-size: 13px;
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
      }
      .__disabled {
        background-color: #f8f8f8;
      }
    }
  }
}
.__active {
  visibility: visible !important;
}
.__meeting-modal {
  visibility: hidden;
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
        textarea {
          width: 100%;
          height: 22vh;
          font-size: 15px;
          color: #777777;
          border: 0;
          &:focus {
            outline: none;
          }
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
        > button {
          font-size: 16px;
          position: relative;
          width: 48%;
          padding: 14px;
          border-radius: 50px;
          font-weight: 600;
        }
        .__meeting-btn {
          background: #e83828;
          border: #e83828;
          color: white;
        }
        .__meeting-cancel-btn {
          background: #e4e4e4;
          border: #e4e4e4;
          color: #383838;
        }
      }
    }
  }
}
</style>
