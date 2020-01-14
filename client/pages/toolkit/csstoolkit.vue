<template>
  <section class="css-wrap">
    <div class="css-flex config-wrap">
      <el-collapse v-model="activeNames"
                   accordion>
        <el-collapse-item title="border-radius"
                          name="1">
          <div class="config-place">
            <!-- 左上 -->
            <div>
              <div class="config-title">border-top-left-radius: </div>
              <div>
                <div>horizontal: </div>
                <el-slider v-model="top_left_horizontal_value"
                           :max="sliderMax"
                           show-input>
                </el-slider>
              </div>
              <div>
                <div>vertical: </div>
                <el-slider v-model="top_left_vertical_value"
                           :max="sliderMax"
                           show-input>
                </el-slider>
              </div>
            </div>
            <!-- 右上 -->
            <div>
              <div class="config-title">border-top-right-radius: </div>
              <div>
                <div>horizontal: </div>
                <el-slider v-model="top_right_horizontal_value"
                           :max="sliderMax"
                           show-input>
                </el-slider>
              </div>
              <div>
                <div>vertical: </div>
                <el-slider v-model="top_right_vertical_value"
                           :max="sliderMax"
                           show-input>
                </el-slider>
              </div>
            </div>
            <!-- 左下 -->
            <div>
              <div class="config-title">border-bottom-left-radius: </div>
              <div>
                <div>horizontal: </div>
                <el-slider v-model="bottom_left_horizontal_value"
                           :max="sliderMax"
                           show-input>
                </el-slider>
              </div>
              <div>
                <div>vertical: </div>
                <el-slider v-model="bottom_left_vertical_value"
                           :max="sliderMax"
                           show-input>
                </el-slider>
              </div>
            </div>
            <!-- 右下 -->
            <div>
              <div class="config-title">border-bottom-right-radius: </div>
              <div>
                <div>horizontal: </div>
                <el-slider v-model="bottom_right_horizontal_value"
                           :max="sliderMax"
                           show-input>
                </el-slider>
              </div>
              <div>
                <div>vertical: </div>
                <el-slider v-model="bottom_right_vertical_value"
                           :max="sliderMax"
                           show-input>
                </el-slider>
              </div>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item title="box-shadow"
                          name="2">
          <div class="config-place">
            <div>
              <div class="config-title">horizontal length: </div>
              <el-slider v-model="horizontal_length"
                         :min="-sliderMax"
                         :max="sliderMax"
                         show-input>
              </el-slider>
            </div>
            <div>
              <div class="config-title">vertical length: </div>
              <el-slider v-model="vertical_length"
                         :min="-sliderMax"
                         :max="sliderMax"
                         show-input>
              </el-slider>
            </div>
            <div>
              <div class="config-title">blur radius: </div>
              <el-slider v-model="blur_radius"
                         :max="sliderMax"
                         show-input>
              </el-slider>
            </div>
            <div>
              <div class="config-title">spread radius: </div>
              <div>horizontal: </div>
              <el-slider v-model="spread_radius"
                         :min="-sliderMax"
                         :max="sliderMax"
                         show-input>
              </el-slider>
            </div>
            <div>
              <div class="config-title">shadow color: </div>
              <div>
                <div>R</div>
                <el-slider v-model="shadow_color_r"
                           :max="255"
                           show-input>
                </el-slider>
              </div>
              <div>
                <div>G</div>
                <el-slider v-model="shadow_color_g"
                           :max="255"
                           show-input>
                </el-slider>
              </div>
              <div>
                <div>B</div>
                <el-slider v-model="shadow_color_b"
                           :max="255"
                           show-input>
                </el-slider>
              </div>
            </div>
            <div>
              <div class="config-title">opacity: </div>
              <el-slider v-model="shadow_opacity"
                         :max="1"
                         :step="0.01"
                         show-input>
              </el-slider>
            </div>
            <div>
              <div class="config-title">inset: </div>
              <el-switch v-model="shadow_inset"
                         active-text="inset"
                         inactive-text="outline">
              </el-switch>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item title="background gradient"
                          name="3">
          <div class="config-place">
            <div>
              <div class="config-title">gradient type: </div>
              <el-switch v-model="gradient_type"
                         active-text="linear"
                         inactive-text="radial">
              </el-switch>
            </div>
            <div class="gradient-type-wrap"
                 v-if="gradient_type">
              <div>
                <div class="config-title">angle: </div>
                <el-slider v-model="gradient_angle"
                           :min="0"
                           :max="360"
                           show-input>
                </el-slider>
              </div>
            </div>
            <div class="gradient-type-wrap"
                 v-else>
              <div>
                <div class="config-title">radial type: </div>
                <el-switch v-model="gradient_radial_type"
                           active-text="ellipse"
                           inactive-text="circle">
                </el-switch>
              </div>
            </div>
            <div class="gradient-color-wrap">
              <div class="color-list">
                <div v-for="(item, index) in gradient_color_list"
                     :key="index">
                  <div class="color-list-show"
                       :style="{ background: `${item.color}` }"></div>
                  <el-input placeholder="color-stop"
                            v-model="item.color"
                            clearable>
                  </el-input>
                  <el-input placeholder="length or percentage"
                            v-model="item.length"
                            clearable>
                  </el-input>
                  <el-button v-if="gradient_color_list.length > 2"
                             @click="() => removeColor(index)"
                             plain>delete</el-button>
                </div>
              </div>
              <el-button @click="addColor"
                         type="primary">add color</el-button>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
      <div class="show-place-wrap">
        <div class="show-place"
             :style="{
              width: `${(!gradient_type && gradient_radial_type) ? sliderMax+100 : sliderMax}px`, height: `${sliderMax}px`,
              borderRadius: `${top_left_horizontal_value}px ${top_right_horizontal_value}px ${bottom_left_horizontal_value}px ${bottom_right_horizontal_value}px / ${top_left_vertical_value}px ${top_right_vertical_value}px ${bottom_left_vertical_value}px ${bottom_right_vertical_value}px`,
              boxShadow: `${horizontal_length}px ${vertical_length}px ${blur_radius}px ${spread_radius}px rgba(${shadow_color_r}, ${shadow_color_g}, ${shadow_color_b}, ${shadow_opacity}) ${shadow_inset ? 'inset' : ''}`,
              background: `${gradient_type ? 'linear-gradient' : 'radial-gradient'}(${gradient_type ? gradient_angle+'deg' : (gradient_radial_type ? 'ellipse' : 'circle')}, ${gradient_color_list.map(item => item.color+' '+item.length).join(',')})`,
            }"></div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      activeNames: [],
      sliderMax: 300,

      // border-radius --------------------------------------<
      top_left_horizontal_value: 0,
      top_left_vertical_value: 0,
      top_right_horizontal_value: 0,
      top_right_vertical_value: 0,
      bottom_left_horizontal_value: 0,
      bottom_left_vertical_value: 0,
      bottom_right_horizontal_value: 0,
      bottom_right_vertical_value: 0,

      // box-shadow
      horizontal_length: 50,
      vertical_length: 50,
      blur_radius: 0,
      spread_radius: 0,
      shadow_color_r: 0,
      shadow_color_g: 0,
      shadow_color_b: 0,
      shadow_opacity: 1,
      shadow_inset: false,

      // background gradient
      gradient_type: true, // true --> linear-gradient, false --> radial-gradient
      gradient_angle: 135,
      gradient_radial_type: true,
      gradient_color_list: [
        { color: '#ead6ee', length: '80px' },
        { color: 'rgb(160,241,234)', length: '300px' },
      ],
    }
  },
  mounted() {},
  methods: {
    addColor() {
      this.gradient_color_list.push({})
    },
    removeColor(index) {
      // 使用 vm.$set 和 vm.$delete 修改对象或数组元素，保持页面同步
      this.$delete(this.gradient_color_list, index)
    },
  },
  watch: {},
}
</script>

<style>
@import '../../assets/css/reset';

.css-flex {
  display: flex;
  justify-content: center;

  width: 100%;
  height: 100%;
}
.css-wrap {
  width: 100vw;
  height: 100vh;
  padding: 200px 20px 20px 20px;
}
.config-place {
  width: 100%;
  padding-left: 20px;
}
.show-place-wrap {
  display: flex;
  justify-content: center;

  width: 400px;
  margin-left: 200px;
}
.show-place {
  background: palevioletred;
}
.config-title {
  margin-left: -10px;
  font-size: 18px;
  color: #1989fa;
}
.el-collapse {
  width: 550px;
}
.gradient-type-wrap {
  margin-top: 10px;
}
.gradient-color-wrap {
  margin-top: 20px;
}
.color-list {
  margin-bottom: 20px;
}
.color-list > div {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.color-list-show {
  flex-shrink: 0;
  margin-right: 20px;
  width: 30px;
  height: 30px;
  border-radius: 5px;
}
.el-input {
  margin-right: 20px;
}
.el-switch {
  margin-top: 10px;
}
</style>