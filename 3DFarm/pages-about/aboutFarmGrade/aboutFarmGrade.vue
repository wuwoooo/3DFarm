<template>
  <view class="page flex-col">
    <view class="box1 flex-col">
      <view class="bd3 flex-col">
        <view class="section1 flex-col">
          <view class="block1 flex-row justify-between">
            <text class="txt1">LV{{grade}}</text>
          </view>
        </view>
        
        <view class="section2 flex-col">
           <view style="height: 80rpx;"></view> 
          <view class="box2 flex-row justify-between">
            <view class="group3 flex-col">
              <view class="group1 flex-row">
                <view class="ImageText1 flex-col">
                  <view class="wrap1 flex-col justify-between">
                    <image class="pic5" src="@/pages-about/static/farmGrade1.png" />                    
                  </view>
                </view>
              </view>
            </view>
            <view class="group4 flex-col">
              <view class="outer2 flex-row">
                <view class="TextGroup2 flex-col">
                  <view class="group2 flex-col justify-between">
                    <text class="txt2">一级果农</text>
                    <view class="section5">
                      <text class="paragraph1">
                        手续费：<text style="color: rgba(255, 150, 0, 1);">50%</text>
                        <br />
                        个人成功激活树苗
                      </text>
                    </view>
                  </view>
                </view>
              </view>
            </view>
          </view>
          
            <view class="box2 flex-row justify-between">
              <view class="group3 flex-col">
                <view class="group1 flex-row">
                  <view class="ImageText1 flex-col">
                    <view class="wrap1 flex-col justify-between">
                      <image class="pic5" src="@/pages-about/static/farmGrade2.png" />
                    </view>
                  </view>
                </view>
              </view>
              <view class="group4 flex-col">
                <view class="outer2 flex-row">
                  <view class="TextGroup2 flex-col">
                    <view class="group2 flex-col justify-between">
                      <text class="txt2">二级果农</text>
                      <view class="section5">
                        <text class="paragraph1">
                          手续费：<text style="color: rgba(255, 150, 0, 1);">35%</text>
                          <br />
                          至少分享3人激活树苗
                        </text>
                      </view>
                    </view>
                  </view>
                </view>
              </view>
            </view>
            
              <view class="box2 flex-row justify-between">
                <view class="group3 flex-col">
                  <view class="group1 flex-row">
                    <view class="ImageText1 flex-col">
                      <view class="wrap1 flex-col justify-between">
                        <image class="pic5" src="@/pages-about/static/farmGrade3.png" />                    
                      </view>
                    </view>
                  </view>
                </view>
                <view class="group4 flex-col">
                  <view class="outer2 flex-row">
                    <view class="TextGroup2 flex-col">
                      <view class="group2 flex-col justify-between">
                        <text class="txt2">三级果农</text>
                        <view class="section5">
                          <text class="paragraph1">
                            手续费：<text style="color: rgba(255, 150, 0, 1);">30%</text>
                            <br />
                            至少分享20人激活树苗
                          </text>
                        </view>
                      </view>
                    </view>
                  </view>
                </view>
              </view>
              
                <view class="box2 flex-row justify-between">
                  <view class="group3 flex-col">
                    <view class="group1 flex-row">
                      <view class="ImageText1 flex-col">
                        <view class="wrap1 flex-col justify-between">
                          <image style="width: 98rpx;height: 120rpx;" src="@/pages-about/static/farmGrade4.png" />                    
                        </view>
                      </view>
                    </view>
                  </view>
                  <view class="group4 flex-col">
                    <view class="outer2 flex-row">
                      <view class="TextGroup2 flex-col">
                        <view class="group2 flex-col justify-between">
                          <text class="txt2">四级果农</text>
                          <view class="section5">
                            <text class="paragraph1">
                              手续费：<text style="color: rgba(255, 150, 0, 1);">25%</text>
                              <br />
                              至少分享40人激活树苗
                            </text>
                          </view>
                        </view>
                      </view>
                    </view>
                  </view>
                </view>
                
                  <view class="box2 flex-row justify-between">
                    <view class="group3 flex-col">
                      <view class="group1 flex-row">
                        <view class="ImageText1 flex-col">
                          <view class="wrap1 flex-col justify-between">
                            <image style="width: 98rpx;height: 120rpx;" src="@/pages-about/static/farmGrade5.png" />                    
                          </view>
                        </view>
                      </view>
                    </view>
                    <view class="group4 flex-col">
                      <view class="outer2 flex-row">
                        <view class="TextGroup2 flex-col">
                          <view class="group2 flex-col justify-between">
                            <text class="txt2">五级果农</text>
                            <view class="section5">
                              <text class="paragraph1">
                                手续费：<text style="color: rgba(255, 150, 0, 1);">20%</text>
                                <br />
                                至少分享100人激活树苗
                              </text>
                            </view>
                          </view>
                        </view>
                      </view>
                    </view>
                  </view>

            </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      grade:1,
    };
  },
  methods: {      
  },
  onLoad(option) {
      if(option.p) this.grade = option.p
  }
};
</script>
<style>
@import '@/common/common.css';
@import './index.css';
</style>
