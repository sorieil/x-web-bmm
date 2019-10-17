<template>
  <div class="__container">
    <div class="__meeting">
      <div class="__dates">
        <div class="__scroll" :style="{ width: dateScrollWidth + 'px' }">
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
        <li
          v-for="(time, index) in times"
          :key="index"
          @click="fnOpneMeetingRequest()"
        >
          <div v-if="time.status === '예약가능'">
            <span class="__time">{{ time.time }}</span>
            <span class="__status __possible">{{ time.status }}</span>
          </div>
          <div v-else-if="time.status === '예약됨'" class="__disabled">
            <span class="__time">{{ time.time }}</span>
            <span class="__status __complete">{{ time.status }}</span>
          </div>
          <div v-else-if="time.status === '예약불가'" class="__disabled">
            <span class="__time">{{ time.time }}</span>
            <span class="__status __impossible">{{ time.status }}</span>
          </div>
        </li>
      </ul>
    </div>
    <Modal
      class="__meeting-modal animated"
      :class="{
        fadeInUpBig: modalStatus,
        fadeOutUpBig: !modalStatus,
      }"
    >
      <div slot="ModalContent" class="__modal-content">
        <div class="__header">
          <span class="__title">미팅 신청 정보</span>
          <button class="__close" @click="modalClose">
            <i class="material-icons-round">close</i>
          </button>
        </div>
        <div v-if="modalStatus" class="__content">
          <div class="__applicant">
            <h3>신청자</h3>
            <div>
              <div class="__profile">
                <div class="__profile-img">
                  <img v-img="''" />
                </div>
                <p>{{ applicant.name }}</p>
              </div>
              <div class="__applicant-detail">
                <p>
                  <span>직위</span>
                  {{ applicant.position }}
                </p>
                <p>
                  <span>부서</span>
                  {{ applicant.department }}
                </p>
                <p>
                  <span>연락처</span>
                  {{ applicant.number }}
                </p>
                <p>
                  <span>이메일</span>
                  {{ applicant.email }}
                </p>
              </div>
            </div>
          </div>
          <div class="__date-time">
            <h3>날짜/시간</h3>
            <div>
              <span>
                {{ meetingDateMM }}월 {{ meetingDateDD }}일
                <datetime
                  v-model="meetingSelectDate"
                  format="MM/DD/YYYY"
                ></datetime>
              </span>
              <span class="timepicker">
                {{ meetingTime }} {{ meetingAmPm }}
                <datetime v-model="meetingSelectTime" format="H:i"></datetime>
              </span>
              <span>15min</span>
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
            <button class="__meeting-btn" type="button">미팅 신청 확인</button>
            <button class="__meeting-cancel-btn" type="button">
              미팅 신청 취소
            </button>
          </div>
        </div>
      </div>
    </Modal>
  </div>
</template>
<script>
import DirectiveImage from '../mixin/directive_image';
import { SUB_HEADER_SET } from '../store/constant_types';
import Modal from '~/components/common/ModalFull';
export default {
  layout: 'subDefault',
  components: { Modal, datetime: () => import('vuejs-datetimepicker') },
  mixins: [DirectiveImage],
  data() {
    return {
      dates: [
        {
          mm: 11,
          dd: 11,
          week: 'TUE',
        },
        {
          mm: 11,
          dd: 12,
          week: 'MON',
        },
        {
          mm: 11,
          dd: 13,
          week: 'WED',
        },
        {
          mm: 11,
          dd: 14,
          week: 'THU',
        },
        {
          mm: 11,
          dd: 15,
          week: 'FRI',
        },
      ],
      times: [
        {
          time: '09:00',
          status: '예약됨',
        },
        {
          time: '09:15',
          status: '예약됨',
        },
        {
          time: '09:30',
          status: '예약됨',
        },
        {
          time: '09:45',
          status: '예약됨',
        },
        {
          time: '10:00',
          status: '예약가능',
        },
        {
          time: '10:15',
          status: '예약됨',
        },
        {
          time: '10:30',
          status: '예약됨',
        },
        {
          time: '10:45',
          status: '예약가능',
        },
        {
          time: '11:00',
          status: '예약가능',
        },
        {
          time: '11:15',
          status: '예약불가',
        },
        {
          time: '11:30',
          status: '예약불가',
        },
      ],
      applicant: {
        name: '최수진',
        position: '팀장',
        department: '디자인컨설팅',
        number: '010-4444-5555',
        email: 'sujin.lee@pxd.co.kr',
      },
      meetingSelectDate: null,
      meetingSelectTime: null,
      meetingDateMM: '00',
      meetingDateDD: '00',
      meetingTime: '00:00',
      meetingAmPm: 'AM',
      activeDate: 0,
      dateScrollWidth: null,
      modalStatus: false,
      meetingMemo: null,
      memoRemoveIcon: false,
      meetingRoom: '네트워킹 테이블 A81',
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
  mounted() {
    this.dateScrollWidth = this.dates.length * 120;
    this.$store.commit(SUB_HEADER_SET.load, { subHeaderTitle: '미팅신청' });
  },
  methods: {
    fnDateChange(index, active, event) {
      this.activeDate = index;
    },
    fnOpneMeetingRequest() {
      console.log('zzzz');
      this.modalStatus = true;
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
  padding-top: 40px;
  .__dates {
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
      > div {
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
.__meeting-modal {
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
