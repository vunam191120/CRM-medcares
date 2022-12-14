import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { message } from 'antd';
import clinicAPI from '../../api/clinic';

// Side effect actions
export const fetchClinics = createAsyncThunk(
  'clinicsSlice/fetchClinics',
  async () => {
    try {
      const result = await clinicAPI.getAll();
      return result.data.data;
    } catch (err) {
      return Promise.reject(err);
    }
  }
);

export const fetchClinic = createAsyncThunk(
  'clinicsSlice/fetchClinic',
  async (clinic_id) => {
    try {
      const result = await clinicAPI.getOne(clinic_id);
      return result.data.data;
    } catch (err) {
      return Promise.reject(err.message);
    }
  }
);

export const fetchCategoriesByClinic = createAsyncThunk(
  'clinicsSlice/fetchCategoriesByClinic',
  async (clinic_id) => {
    try {
      const result = await clinicAPI.getCategories(clinic_id);
      return result.data.data;
    } catch (err) {
      return Promise.reject(err.message);
    }
  }
);

export const fetchServicesByClinic = createAsyncThunk(
  'clinicsSlice/fetchServicesByClinic',
  async (clinic_id) => {
    try {
      const result = await clinicAPI.getServices(clinic_id);
      return result.data.data;
    } catch (err) {
      return Promise.reject(err.message);
    }
  }
);

export const fetchDoctorsClinic = createAsyncThunk(
  'clinicsSlice/fetchDoctorsClinic',
  async (clinic_id) => {
    try {
      const result = await clinicAPI.getDoctors(clinic_id);
      return result.data.data;
    } catch (err) {
      return Promise.reject(err.message);
    }
  }
);

export const fetchStaffsClinic = createAsyncThunk(
  'clinicsSlice/fetchStaffsClinic',
  async (clinic_id) => {
    try {
      const result = await clinicAPI.getStaffs(clinic_id);
      return result.data.data;
    } catch (err) {
      return Promise.reject(err.message);
    }
  }
);

export const createStaffClinic = createAsyncThunk(
  'clinicsSlice/createStaffClinic',
  async (staff) => {
    try {
      const result = await clinicAPI.createStaff(staff);
      return result.data.data;
    } catch (err) {
      return Promise.reject(err.message);
    }
  }
);

export const updateStaffClinic = createAsyncThunk(
  'clinicsSlice/updateStaffClinic',
  async (staff) => {
    try {
      await clinicAPI.updateStaff(staff);
      return staff;
    } catch (err) {
      return Promise.reject(err.message);
    }
  }
);

export const createClinic = createAsyncThunk(
  'clinicsSlice/createClinic',
  async (clinic) => {
    try {
      const result = await clinicAPI.create(clinic);
      return result.data.data;
    } catch (err) {
      return Promise.reject(err.response.data.errors[0]);
    }
  }
);

export const updateClinic = createAsyncThunk(
  'clinicsSlice/updateClinic',
  async (clinic) => {
    try {
      const result = await clinicAPI.update(clinic);
      return result;
    } catch (err) {
      return Promise.reject(err.message);
    }
  }
);

export const updateCategoriesStatus = createAsyncThunk(
  'clinicsSlice/updateCategoriesStatus',
  async (data) => {
    try {
      await clinicAPI.updateCategories(data);
      return data;
    } catch (err) {
      return Promise.reject(err.message);
    }
  }
);

export const updateServicesStatus = createAsyncThunk(
  'clinicsSlice/updateServicesStatus',
  async (data) => {
    try {
      await clinicAPI.updateServices(data);
      return data;
    } catch (err) {
      return Promise.reject(err.message);
    }
  }
);

export const deleteClinic = createAsyncThunk(
  'clinicsSlice/deleteClinic',
  async (clinic_id) => {
    try {
      const result = await clinicAPI.delete(clinic_id);
      if (result.data.data === 1) {
        return clinic_id;
      } else {
        return Promise.reject('Delete failed');
      }
    } catch (err) {
      return Promise.reject(err);
    }
  }
);

export const deleteImage = createAsyncThunk(
  'clinicsSlice/deleteImage',
  async (file) => {
    try {
      // If image is new and not on sever, delete only by slicing
      if (!file.old_file) {
        return file;
      }
      const result = await clinicAPI.deleteImage(file.uid);
      console.log('result at delete image clinic: ', result);
      return file;
    } catch (err) {
      return Promise.reject(err.message);
    }
  }
);

export const createDoctorClinic = createAsyncThunk(
  'clinicsSlice/createDoctorClinic',
  async (doctor) => {
    try {
      const result = await clinicAPI.createDoctor(doctor);
      return result.data.data;
    } catch (err) {
      return Promise.reject(err.message);
    }
  }
);

export const updateDoctorClinic = createAsyncThunk(
  'clinicsSlice/updateDoctorClinic',
  async (doctor) => {
    try {
      await clinicAPI.updateDoctor(doctor);
      return doctor;
    } catch (err) {
      return Promise.reject(err.message);
    }
  }
);

export const deleteDoctorClinic = createAsyncThunk(
  'clinicsSlice/deleteDoctorClinic',
  async (doctor_id) => {
    try {
      const result = await clinicAPI.deleteDoctor(doctor_id);
      return result.data.data;
    } catch (err) {
      return Promise.reject(err.message);
    }
  }
);

// Reducer

const clinicsSlice = createSlice({
  name: 'clinicsSlice',
  initialState: {
    clinics: [],
    doctors: [],
    staffs: [],
    categories: [],
    services: [],
    clinicNeedUpdate: {},
    searchTerm: '',
    isLoading: false,
    hasError: false,
  },
  reducers: {
    addClinicNeedUpdateImage: (state, action) => {
      state.clinicNeedUpdate.images = [
        ...state.clinicNeedUpdate.images,
        action.payload,
      ];
    },
    setClinicNeedUpdate: (state, action) => {
      state.clinicNeedUpdate.clinic = {
        ...state.clinicNeedUpdate.clinic,
        ...action.payload,
      };
    },
    changeSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
  extraReducers: {
    // Fetch Clinics
    [fetchClinics.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [fetchClinics.fulfilled]: (state, action) => {
      state.clinics = action.payload;
      state.isLoading = false;
      state.hasError = false;
    },
    [fetchClinics.rejected]: (state, action) => {
      message.err(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    // Fetch Clinic
    [fetchClinic.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [fetchClinic.fulfilled]: (state, action) => {
      const images = action.payload.images.map((img) => ({
        uid: img.image_id,
        status: 'done',
        url: img.url,
        title: img.url,
        old_file: true,
      }));
      state.clinicNeedUpdate = {
        ...state.clinicNeedUpdate,
        ...action.payload,
        images: [...images],
      };
      state.isLoading = false;
      state.hasError = false;
    },
    [fetchClinic.rejected]: (state, action) => {
      message.err(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    // Fetch Categories By Clinic
    [fetchCategoriesByClinic.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [fetchCategoriesByClinic.fulfilled]: (state, action) => {
      state.categories = action.payload;
      state.isLoading = false;
      state.hasError = false;
    },
    [fetchCategoriesByClinic.rejected]: (state, action) => {
      message.err(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    // Fetch Services By Clinic
    [fetchServicesByClinic.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [fetchServicesByClinic.fulfilled]: (state, action) => {
      state.services = action.payload;
      state.isLoading = false;
      state.hasError = false;
    },
    [fetchServicesByClinic.rejected]: (state, action) => {
      message.err(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    // Fetch doctors by clinic
    [fetchDoctorsClinic.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [fetchDoctorsClinic.fulfilled]: (state, action) => {
      state.doctors = action.payload;
      state.isLoading = false;
      state.hasError = false;
    },
    [fetchDoctorsClinic.rejected]: (state, action) => {
      message.err(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    // Fetch staffs by clinic
    [fetchStaffsClinic.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [fetchStaffsClinic.fulfilled]: (state, action) => {
      state.staffs = action.payload;
      state.isLoading = false;
      state.hasError = false;
    },
    [fetchStaffsClinic.rejected]: (state, action) => {
      message.err(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    // Create Clinic
    [createClinic.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [createClinic.fulfilled]: (state, action) => {
      state.clinics = [...state.clinics, action.payload];
      message
        .loading('Action in progress..', 0.5)
        .then(() => message.success('Added new clinic successfully!', 3));
      state.isLoading = false;
      state.hasError = false;
    },
    [createClinic.rejected]: (state, action) => {
      message.err(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    // Create Doctor
    [createDoctorClinic.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [createDoctorClinic.fulfilled]: (state, action) => {
      message
        .loading('Action in progress..', 0.5)
        .then(() =>
          message.success('Added new doctor into clinic successfully!', 3)
        );
      state.doctors = [...state.doctors, action.payload];
      state.isLoading = false;
      state.hasError = false;
    },
    [createDoctorClinic.rejected]: (state, action) => {
      message.err(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    // Create Staff
    [createStaffClinic.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [createStaffClinic.fulfilled]: (state, action) => {
      message
        .loading('Action in progress..', 0.5)
        .then(() =>
          message.success('Added new staff into clinic successfully!', 3)
        );
      state.staffs = [...state.staffs, action.payload];
      state.isLoading = false;
      state.hasError = false;
    },
    [createStaffClinic.rejected]: (state, action) => {
      message.err(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    // Update Doctor
    [updateDoctorClinic.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [updateDoctorClinic.fulfilled]: (state, action) => {
      message
        .loading('Action in progress..', 0.5)
        .then(() => message.success('Updated doctor successfully!', 3));
      state.doctors = state.doctors.map((doctor) => {
        if (doctor.doctor_id === action.payload.doctor_id) {
          doctor = { ...doctor, ...action.payload };
        }
        return doctor;
      });
      state.isLoading = false;
      state.hasError = false;
    },
    [updateDoctorClinic.rejected]: (state, action) => {
      message.err(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    // Update Staff
    [updateStaffClinic.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [updateStaffClinic.fulfilled]: (state, action) => {
      message
        .loading('Action in progress..', 0.5)
        .then(() => message.success('Updated staff successfully!', 3));
      state.staffs = state.staffs.map((staff) => {
        if (staff.user_id === action.payload.user_id) {
          staff = { ...staff, ...action.payload };
        }
        return staff;
      });
      state.isLoading = false;
      state.hasError = false;
    },
    [updateStaffClinic.rejected]: (state, action) => {
      message.err(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    // Update Clinic
    [updateClinic.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [updateClinic.fulfilled]: (state, action) => {
      message
        .loading('Action in progress..', 0.5)
        .then(() => message.success('Update clinic successfully!', 3));
      state.isLoading = false;
      state.hasError = false;
    },
    [updateClinic.rejected]: (state, action) => {
      message.err(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    // Update Category Status
    [updateCategoriesStatus.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [updateCategoriesStatus.fulfilled]: (state, action) => {
      message
        .loading('Action in progress..', 0.5)
        .then(() =>
          message.success('Update categories status successfully!', 3)
        );
      state.categories = state.categories.map((cate) => {
        action.payload.categories.find((item) => {
          if (item.category_id === cate.category_id) {
            // cate.status = item.status;
            cate.status = item.status;
            return item;
          }
          return false;
        });
        return cate;
      });
      state.isLoading = false;
      state.hasError = false;
    },
    [updateCategoriesStatus.rejected]: (state, action) => {
      message.err(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    // Update Services Status
    [updateServicesStatus.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [updateServicesStatus.fulfilled]: (state, action) => {
      message
        .loading('Action in progress..', 0.5)
        .then(() => message.success('Update services status successfully!', 3));
      state.services = state.services.map((service) => {
        action.payload.services.find((item) => {
          if (item.service_id === service.service_id) {
            // service.status = item.status;
            service.status = !service.status;
          }
          return false;
        });
        return service;
      });
      state.isLoading = false;
      state.hasError = false;
    },
    [updateServicesStatus.rejected]: (state, action) => {
      message.err(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    // Delete Clinic
    [deleteClinic.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [deleteClinic.fulfilled]: (state, action) => {
      message
        .loading('Action in progress..', 0.5)
        .then(() => message.success('Deleted clinic successfully!', 3));
      state.clinics = state.clinics.filter(
        (clinic) => clinic.clinic_id !== action.payload
      );
      state.isLoading = false;
      state.hasError = false;
    },
    [deleteClinic.rejected]: (state, action) => {
      message.error(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    // Delete Image
    [deleteImage.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [deleteImage.fulfilled]: (state, action) => {
      message
        .loading('Action in progress..', 0.5)
        .then(() => message.success('Deleted old image successfully!', 3));
      const newFileList = state.clinicNeedUpdate.images.filter(
        (image) => image.uid !== action.payload.uid
      );
      state.clinicNeedUpdate.images = newFileList;
      state.isLoading = false;
      state.hasError = false;
    },
    [deleteImage.rejected]: (state, action) => {
      message.error(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    // Delete doctor
    [deleteDoctorClinic.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [deleteDoctorClinic.fulfilled]: (state, action) => {
      message
        .loading('Action in progress..', 0.5)
        .then(() =>
          message.success('Deleted doctor from clinic successfully!', 3)
        );
      state.doctors = state.doctors.filter(
        (doctor) => doctor.doctor_id !== action.doctor_id
      );
      state.isLoading = false;
      state.hasError = false;
    },
    [deleteDoctorClinic.rejected]: (state, action) => {
      message.error(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
  },
});

// Actions
export const {
  addClinicNeedUpdateImage,
  setClinicNeedUpdate,
  changeSearchTerm,
} = clinicsSlice.actions;

// Selectors
export const selectClinicsLoading = (state) => state.clinics.isLoading;

export const selectClinicsError = (state) => state.clinics.hasError;

export const selectClinics = (state) => state.clinics.clinics;

export const selectClinicNeedUpdate = (state) => state.clinics.clinicNeedUpdate;

export const selectCategoriesByClinic = (state) => state.clinics.categories;

export const selectServicesByClinic = (state) => state.clinics.services;

export const selectPaymentsByClinic = (state) => state.clinics.payments;

export const selectDoctorsByClinic = (state) => state.clinics.doctors;

export const selectStaffsByClinic = (state) => state.clinics.staffs;

export const selectSearchTermClinic = (state) => state.clinics.searchTerm;

export const selectFilteredDoctorsByClinic = (state) => {
  const doctors = selectDoctorsByClinic(state);
  const searchTerm = selectSearchTermClinic(state);
  return doctors.filter((doctor) =>
    doctor.doctor.full_name.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

export const selectFilteredStaffsByClinic = (state) => {
  const staffs = selectStaffsByClinic(state);
  const searchTerm = selectSearchTermClinic(state);

  return staffs.filter((staff) =>
    staff.user.full_name.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

export default clinicsSlice.reducer;
