<template>
  <Cvprogress/>
  <div class="container-fluid mb-5">
    <div class="info-title d-flex  mb-3 bg-gray-3  mt-4 ">
      <div
          v-if="UserData.jobSeeker"
          class=" col-8 d-flex align-items-start flex-column flex-wrap align-content-start justify-content-center p-2 py-1 px-4">
        <div class="d-flex col-12 gap-3 p-1">
          <span> {{ UserData.jobSeeker.fullPersonName }}</span>
        </div>
        <div class="d-flex col-12 gap-3 p-1">
        </div>
      </div>
      <div class="col-4 ">
        <div class="p-3">
          <img alt="" src="/img/icon/Group%20552.svg"/>
        </div>
      </div>
    </div>

    <div v-if="UserData.jobSeeker"
         class="info-title d-flex mb-3 flex-column ">

      <div class="d-flex col-12 gap-3 p-1  justify-content-between">
        <div>
          <img alt="" src="/img/icon/Group%20660.svg">
          <span> تاریخ تولد  </span>
        </div>
        <span> {{ UserData.jobSeeker.birthDate }}</span>
      </div>
      <div class="d-flex col-12 gap-3 p-1 bg-gray-3 justify-content-between">
        <div><img alt="" src="/img/icon/Rectangle%20510.svg"> <span> وضعیت تاهل  </span></div>
        <span> {{ UserData.jobSeeker.marriedTypeTitle }}</span>
      </div>
      <div class="d-flex col-12 gap-3 p-1  justify-content-between">
        <div><img alt="" src="/img/icon/Rectangle%20510.svg"> <span> وضعیت جسمانی   </span></div>
        <span> {{ UserData.jobSeeker.isDisabilityTitle }}</span>
      </div>
      <div class="d-flex col-12 gap-3 p-1 bg-gray-3 justify-content-between">
        <div>
          <img alt="" src="/img/icon/Group%20659.svg">
          <span> شماره تماس  </span>
        </div>
        <span> {{ UserData.jobSeeker.mobile }} </span>
      </div>
    </div>

    <div v-if="UserData.jobSeekerSkills">
      <div class="d-flex col-12  justify-content-between p-2  py-2">
        <div class="d-flex align-items-center gap-2">
          <img alt="" src="/img/icon/Group%20654.svg">
          <span class="text-center">سوابق مهارتی  </span>
            <nuxt-link to="/jobSeeker/resume/edit/skillRecord">
              <i class="pi pi-plus text-blue-3"></i>
            </nuxt-link>
        </div>
        <div class="gap-3 d-flex">
          <button class="prev-button col-1" @click="prevSlide(trackSkills)">&lt;</button>
          <button class="next-button col-1" @click="  nextSlide(trackSkills)">&gt;</button>
      </div>
      </div>
      <div v-if="UserData.jobSeekerSkills.length>0" class="carousel-container info-title bg-gray-3 d-flex align-items-center">
        <div ref="trackSkills" class="carousel-track  col-12">
          <div v-for="data in UserData.jobSeekerSkills" :key="data"
               class=" d-flex my-3 flex-column  px-3 rounded-4 col-12">
            <div class="d-flex col-12 gap-3 p-1 justify-content-between align-items-center">
              <span class="col-12">{{ data.skillTitle }}</span>
            </div>
            <div v-if="data.hasCertification" class="d-flex col-12 gap-3 p-1  justify-content-between">
              <span  class="col-3">{{ data.organTypeTitle }}</span>
            </div>
            <div class="d-flex col-12 gap-3 p-1  justify-content-between">
              <span class="col-3">{{ data.degreeDateEn }}</span>
            </div>
          </div>
        </div>

      </div>
      <p v-else class="text-center">هیچ سابقه ای برای شما ثبت نشده است</p>
    </div>

    <div v-if="UserData.personEducations">
      <div class="d-flex col-12  justify-content-between p-2  py-2">
        <div class="d-flex align-items-center gap-2">
          <img alt="" src="/img/icon/Group%20364.svg">
          <span class="text-center">سوابق تحصیلی  </span>
          <nuxt-link to="/jobSeeker/resume/edit/EduRecord">
            <i class="pi pi-plus text-blue-3"></i>
          </nuxt-link>
        </div>
        <div class="gap-3 d-flex">
          <button class="prev-button col-1" @click="prevSlide(trackEducations)">&lt;</button>
          <button class="next-button col-1" @click="nextSlide(trackEducations)">&gt;</button>
        </div>
      </div>
      <div v-if="UserData.personJobs.length >0">
        <div class="carousel-container info-title bg-gray-3 d-flex align-items-center">
          <div ref="trackEducations" class="carousel-track col-10">
            <div v-for="data in UserData.personEducations" :key="data"
                 class="info-title d-flex my-3 flex-column px-3 col-12 ">
              <div class="d-flex col-12  align-items-center">
                <div class="d-flex col-11  align-items-center">
                  <span class=" text-center"> {{ data.eduLevelTitle }} - </span>
                  <span> {{ data.educationFieldTitle }}  </span>
                </div>
                <div class="d-flex ">
                  <img alt="logo"
                           src="/img/icon/pen.svg"
                           width="22"
                           @click="EditButton(data,'/jobSeeker/resume/edit/EduRecord' )"/>
                </div>
              </div>

              <div class=" col-12 gap-3 p-1  justify-content-between align-items-center">
                <span class=" text-center"> {{ data.educationLocationTitle }} -</span>
                <span class=" text-center px-2">{{ data.universityTitle }} </span>
              </div>
              <div class="d-flex col-12  p-1   align-items-center">
                <span class=" text-center"> {{ data.revocationEduDate }}</span>
                <p v-if="data.revocationEduDate">تا</p>
                <p v-else>مشغول به تحصیل</p>
                <span class=" text-center px-2"> - {{ data.expireEduDate }}</span>
              </div>
              <div class=" col-12 gap-3 p-1  align-items-center">
                <span> معدل </span>
                <span class=" text-center"> {{ data.average }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p v-else class="text-center">هیچ سابقه ای برای شما ثبت نشده است</p>
    </div>

    <div v-if="UserData.personJobs">
      <div v-if="UserData.personJobs.length>0">
        <div class="d-flex col-12  justify-content-between p-2  py-2">
          <div class="d-flex align-items-center gap-2">
            <img alt="" src="/img/icon/Group%20364.svg">
            <span class="text-center">سوابق شغلی  </span>
            <nuxt-link to="/jobSeeker/resume/edit/jobRecord">
              <i class="pi pi-plus text-blue-3"></i>
            </nuxt-link>
          </div>
          <div class="gap-3 d-flex">
            <button class="prev-button col-1" @click="prevSlide(trackJobs)">&lt;</button>
            <button class="next-button col-1" @click="nextSlide(trackJobs)">&gt;</button>
          </div>
        </div>
        <div class="carousel-container info-title bg-gray-3 d-flex align-items-center ">
          <div ref="trackJobs" class="carousel-track col-12">
            <div v-for="data in UserData.personJobs" :key="data"
                 class=" d-flex my-3 flex-column  px-3 col-12 ">
              <div class="d-flex col-12  align-items-center">
                <div class="d-flex col-11  align-items-center">
                  <span class=" text-center"> {{ data.iscoTitle }} </span>
                </div>
                <div class="d-flex ">
                  <img alt="logo"
                       src="/img/icon/pen.svg"
                       width="25"
                       @click="EditButton(data,'/jobSeeker/resume/edit/JobRecord' )"/>
                </div>
              </div>

              <div class="d-flex col-12  p-1   align-items-center">
                <span class=" text-center"> {{ data.organTitle }}  - </span>
                <span class=" text-center "> {{ data.organTypeTitle }} -</span>
                <span class=" text-center"> {{ data.cooperativeTypeTitle }}</span>
              </div>

              <div class="d-flex col-12  p-1   align-items-center">
                <span class=" text-center"> {{ data.startDateForm }}</span>
                <p v-if="data.startDateForm">   تا  </p>
                <p v-else>مشغول به کار </p>
                <span class=" text-center px-2"> - {{ data.endDateForm }} </span>
              </div>

            </div>
          </div>

        </div>
      </div>
      <p v-else class="text-center">هیچ سابقه ای برای شما ثبت نشده است</p>
    </div>

    <div v-if="UserData.jobSeekerResearchs">
      <div class="d-flex col-12  justify-content-between p-2  py-2">
        <div class="d-flex align-items-center gap-2">
          <img alt="" src="/img/icon/Group%20364.svg">
          <span class="">
    سوابق پژوهشی   </span>
          <nuxt-link to="/jobSeeker/resume/edit/ResearchRecord">
            <i class="pi pi-plus text-blue-3"></i>
          </nuxt-link>
        </div>
        <div class="gap-3 d-flex">
          <button class="prev-button col-1" @click="prevSlide(trackResearchs)">&lt;</button>
          <button class="next-button col-1" @click="nextSlide(trackResearchs)">&gt;</button>
        </div>
      </div>

      <div v-if="UserData.jobSeekerResearchs.length>0">
        <div class="carousel-container info-title bg-gray-3 d-flex align-items-center">

          <div ref="trackResearchs" class="carousel-track col-12 d-flex align-items-center">
            <div v-for="data in UserData.jobSeekerResearchs"
                 :key="data"
                 class=" d-flex my-3 flex-column  px-3 col-12 ">
              <div class="d-flex col-12  align-items-center">
                <div class="d-flex col-11  align-items-center">
                  <span class=" text-center"> {{ data.titleResearch }} </span>
                </div>
                <div class="d-flex ">
                  <img alt="logo"
                       src="/img/icon/pen.svg"
                       width="25"
                       @click="EditButton(data,'/jobSeeker/resume/edit/ResearchRecord' )"/>
                </div>
              </div>
              <div class="d-flex col-12 gap-3 p-1  justify-content-between align-items-center">
                <span class="col-3"> تاریخ  </span>
                <hr class="dashed-line col-3"/>
                <span class="col-3 text-center"> {{ data.regMoment }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p v-else class="text-center">هیچ سابقه ای برای شما ثبت نشده است</p>
    </div>

    <div v-if="UserData.foreignLanguages">
      <div class="d-flex col-12  justify-content-between p-2  py-2">
        <div class="d-flex align-items-center gap-2">
          <img alt="" src="/img/icon/Group%20457.svg">
          <span class="text-center">سوابق زبان ها  </span>
          <nuxt-link to="/jobSeeker/resume/edit/LanguageRecord">
            <i class="pi pi-plus text-blue-3"></i>
          </nuxt-link>
        </div>
        <div class="gap-3 d-flex">
          <button class="prev-button col-1" @click="prevSlide(trackResearchs)">&lt;</button>
         <button class="next-button col-1" @click="nextSlide(trackResearchs)">&gt;</button>
        </div>
      </div>
      <div v-if="UserData.jobSeekerResearchs.length>0">
        <div class="carousel-container info-title bg-gray-3 d-flex align-items-center">
          <div ref="trackResearchs" class="carousel-track col-12 d-flex align-items-center">
            <div v-for="data in UserData.foreignLanguages"
                 :key="data"
                 class=" d-flex my-3 flex-column  px-3 col-12 ">
              <div class="d-flex col-12  align-items-center">
                <div class="d-flex col-11  align-items-center">
                  <span class=" text-center"> {{ data.languageTitle }} </span>
                </div>
                <div class="d-flex ">
                  <img alt="logo"
                       src="/img/icon/pen.svg"
                       width="25"
                       @click="EditButton(data,'/jobSeeker/resume/edit/LanguageRecord' )"/>
                </div>
              </div>
              <div class="d-flex col-12 gap-3 p-1  justify-content-between align-items-center">
                <span class=" text-center"> {{ data.languguageTypeTitle }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p v-else class="text-center">هیچ سابقه ای برای شما ثبت نشده است</p>
    </div>

  </div>
</template>
<script setup>
import Cvprogress from "~/components/jobSeeker/Cvprogress.vue"
import {MakeResponse} from "~/composables/make-response";
import {BasePage} from "~/core/base/base-page";
import {JobSeekerServices} from "~/core/jobSeeker/jobSeeker-services";
import {onMounted, ref} from "vue";

const UserData = ref([])
definePageMeta({
  name: "رزومه"
});


onMounted(() => {
  MakeResponse.makeServerResponse(JobSeekerServices.getPersonResume({nationalCode: BasePage.getLoggedUser().userName}), true, result => {
    if (result && result.result) {
      UserData.value = result.data
    }
  })
})


const trackSkills = ref(null);
const trackEducations = ref(null);
const trackJobs = ref(null);
const trackResearchs = ref(null);

const nextSlide = (track) => {
  const trackWidth = track.offsetWidth;
  const trackScroll = track.scrollLeft;
  track.scroll({
    left: trackScroll + trackWidth,
    behavior: "smooth",
  });
};

const prevSlide = (track) => {
  const trackWidth = track.offsetWidth;
  const trackScroll = track.scrollLeft;
  track.scroll({
    left: trackScroll - trackWidth,
    behavior: "smooth",
  });
};

const EditButton = (data,url) => {
  const router = useRouter();
  router.push({path:url, query: {id: data.id}});
}

</script>
<style>

</style>