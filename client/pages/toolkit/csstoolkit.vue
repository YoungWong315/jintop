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
        <el-collapse-item title="效率 Efficiency"
                          name="3">
          <div>简化流程：设计简洁直观的操作流程；</div>
          <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
          <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
        </el-collapse-item>
        <el-collapse-item title="可控 Controllability"
                          name="4">
          <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
          <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
        </el-collapse-item>
      </el-collapse>

      <div class="show-place"
           :style="{
             width: `${sliderMax}px`, height: `${sliderMax}px`,
             borderRadius: `${top_left_horizontal_value}px ${top_right_horizontal_value}px ${bottom_left_horizontal_value}px ${bottom_right_horizontal_value}px / ${top_left_vertical_value}px ${top_right_vertical_value}px ${bottom_left_vertical_value}px ${bottom_right_vertical_value}px`,
             boxShadow: `${horizontal_length}px ${vertical_length}px ${blur_radius}px ${spread_radius}px rgba(${shadow_color_r}, ${shadow_color_g}, ${shadow_color_b}, ${shadow_opacity}) ${shadow_inset ? 'inset' : ''}`,
           }"></div>
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
    }
  },
  mounted() {},
  methods: {},
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
  width: 500px;
  padding-left: 20px;
}
.show-place {
  margin-left: 200px;
  background: palevioletred;
}
.config-title {
  margin-left: -10px;
  font-size: 18px;
  color: #1989fa;
}
.el-collapse {
  width: 500px;
}
</style>